import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import {
  getNotFoundResponse,
  getServerErrorResponse,
} from '@/utils/errorHandler';
import { countries } from '@/lib/data/countries';
import { languages } from '@/lib/data/languages';
import { activities } from '@/lib/data/activities';
import { getNames } from '@/utils/get-names';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface GenerateExpeditionRequestBody {
  name: string;
  countries: string[];
  languages: string[];
  activities: string[];
  groupSize: [number, number];
  tourDuration: [Date, Date];
  meetingDate: Date;
}

async function generateExpeditionDescription(request: NextRequest) {
  try {
    const requestBody: GenerateExpeditionRequestBody = await request.json();

    if (!requestBody) {
      return getNotFoundResponse('Form data input');
    }

    const prompt = `Generate a detailed description for an expedition with the following details:
    - Name: ${requestBody.name}
    - Countries: ${getNames(requestBody.countries, countries)}
    - Languages: ${getNames(requestBody.languages, languages)}
    - Activities: ${getNames(requestBody.activities, activities)}
    - Group size: ${requestBody.groupSize[0]} to ${requestBody.groupSize[1]} people
    - Duration: From ${new Date(requestBody.tourDuration[0]).toLocaleDateString()} to ${new Date(requestBody.tourDuration[1]).toLocaleDateString()}
    - Meeting date: ${new Date(requestBody.meetingDate).toLocaleString()}

    Please create an engaging description that includes details from the above information. Format the response with HTML tags for rich text display (<p>, <strong>, <em>). Don't use heading tags. The description should not contain lists of countries, languages or activities. Instead it should be a single or multiple paragraph with all the information. All description should be in English with 1500-2500 characters.`;

    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
    });

    return NextResponse.json({
      description: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error generating description:', error);
    return getServerErrorResponse(error);
  }
}

export { generateExpeditionDescription as POST };
