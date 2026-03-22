package com.aicareercounsellor.demo.service;

import com.aicareercounsellor.demo.model.AptitudeTestResult;
import com.aicareercounsellor.demo.model.CareerRecommendation;
import org.springframework.stereotype.Service;

@Service
public class CareerRecommendationService {

    private final GroqService groqService;

    public CareerRecommendationService(GroqService groqService) {
        this.groqService = groqService;
    }

    public CareerRecommendation generateRecommendation(AptitudeTestResult testResult) {
        // Build a detailed prompt from the aptitude scores
        String prompt = buildPrompt(testResult);

        // Call Groq AI
        String aiResponse = groqService.getCareerRecommendation(prompt);

        // Return structured output model (CareerRecommendation)
        return new CareerRecommendation(
                testResult.getUserId(),
                testResult.getLogicalReasoningScore(),
                testResult.getVerbalReasoningScore(),
                testResult.getQuantitativeScore(),
                aiResponse
        );
    }

    private String buildPrompt(AptitudeTestResult result) {
        return String.format("""
            A student has completed an aptitude test with the following scores (out of 100):
            
            - Logical Reasoning : %d/100
            - Verbal Reasoning  : %d/100
            - Quantitative/Math : %d/100
            
            Based on these scores, please:
            1. Recommend the top 3 careers ranked best to least suitable
            2. For each career, explain in 1-2 sentences WHY it suits this student
            3. Suggest 1 actionable next step for each career path
            4. End with a short encouraging message for the student
            
            Be specific, practical, and motivating.
            """,
                result.getLogicalReasoningScore(),
                result.getVerbalReasoningScore(),
                result.getQuantitativeScore()
        );
    }
}