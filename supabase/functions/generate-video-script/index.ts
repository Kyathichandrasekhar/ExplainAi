import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question, language } = await req.json();
    console.log('Generating script for question:', question, 'in language:', language);

    if (!question) {
      throw new Error('Question is required');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const languageName = language === 'hi' ? 'Hindi' : language === 'te' ? 'Telugu' : 'English';

    const systemPrompt = `You are an expert educational content creator who creates engaging explainer video scripts. 
Your task is to generate a comprehensive video script that explains topics clearly and engagingly.

Generate the response in ${languageName} language.

You must respond with a valid JSON object with this exact structure:
{
  "title": "A catchy, descriptive title for the video",
  "duration": "Estimated duration (e.g., '2-3 minutes')",
  "narration": "The full narration script that will be spoken in the video. Make it conversational, engaging, and educational. Include natural pauses and emphasis. This should be 200-400 words.",
  "scenes": [
    {
      "sceneNumber": 1,
      "title": "Scene title",
      "description": "What visuals should appear in this scene",
      "narrationSegment": "The part of narration for this scene",
      "visualPrompt": "A detailed prompt to generate AI visuals for this scene"
    }
  ],
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "summary": "A brief 2-3 sentence summary of the topic"
}

Create 4-6 scenes that break down the topic logically. Each scene should have clear visual descriptions that could be used to generate animations or images.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Create an explainer video script for the following topic: "${question}"` }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');
    
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content in AI response');
    }

    // Parse the JSON from the response
    let script;
    try {
      // Try to extract JSON from the response (it might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      script = JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      // Create a fallback script structure
      script = {
        title: `Explaining: ${question}`,
        duration: '2-3 minutes',
        narration: content,
        scenes: [
          {
            sceneNumber: 1,
            title: 'Introduction',
            description: 'Opening scene with topic introduction',
            narrationSegment: content.slice(0, 200),
            visualPrompt: `Educational visualization about ${question}`
          }
        ],
        keyPoints: ['Key concept explained'],
        summary: content.slice(0, 150)
      };
    }

    console.log('Script generated successfully:', script.title);

    return new Response(JSON.stringify({ script }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error in generate-video-script:', errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
