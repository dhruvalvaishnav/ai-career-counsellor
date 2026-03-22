package com.aicareercounsellor.demo.model;

import java.time.LocalDateTime;

/**
 * OUTPUT model — represents the AI-generated career recommendation
 * sent back to the React frontend as a JSON response.
 *
 * INPUT  → AptitudeTestResult  (what comes IN  from frontend/Kafka)
 * OUTPUT → CareerRecommendation (what goes BACK to frontend)
 */
public class CareerRecommendation {

    private String userId;
    private int logicalScore;
    private int verbalScore;
    private int quantitativeScore;
    private String aiRecommendation;
    private LocalDateTime processedAt;

    // ── Constructors ──────────────────────────────────────────────

    public CareerRecommendation() {}

    public CareerRecommendation(String userId, int logicalScore, int verbalScore,
                                int quantitativeScore, String aiRecommendation) {
        this.userId = userId;
        this.logicalScore = logicalScore;
        this.verbalScore = verbalScore;
        this.quantitativeScore = quantitativeScore;
        this.aiRecommendation = aiRecommendation;
        this.processedAt = LocalDateTime.now();
    }

    // ── Getters & Setters ─────────────────────────────────────────

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public int getLogicalScore() { return logicalScore; }
    public void setLogicalScore(int logicalScore) { this.logicalScore = logicalScore; }

    public int getVerbalScore() { return verbalScore; }
    public void setVerbalScore(int verbalScore) { this.verbalScore = verbalScore; }

    public int getQuantitativeScore() { return quantitativeScore; }
    public void setQuantitativeScore(int quantitativeScore) { this.quantitativeScore = quantitativeScore; }

    public String getAiRecommendation() { return aiRecommendation; }
    public void setAiRecommendation(String aiRecommendation) { this.aiRecommendation = aiRecommendation; }

    public LocalDateTime getProcessedAt() { return processedAt; }
    public void setProcessedAt(LocalDateTime processedAt) { this.processedAt = processedAt; }

    // ── toString ──────────────────────────────────────────────────
    @Override
    public String toString() {
        return "CareerRecommendation{" +
                "userId='" + userId + '\'' +
                ", logicalScore=" + logicalScore +
                ", verbalScore=" + verbalScore +
                ", quantitativeScore=" + quantitativeScore +
                ", aiRecommendation='" + aiRecommendation + '\'' +
                ", processedAt=" + processedAt +
                '}';
    }
}