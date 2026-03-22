package com.aicareercounsellor.demo.model;


public class AptitudeTestResult {
    private String userId;
    private int logicalReasoningScore;
    private int verbalReasoningScore;
    private int quantitativeScore;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getLogicalReasoningScore() {
        return logicalReasoningScore;
    }

    public void setLogicalReasoningScore(int logicalReasoningScore) {
        this.logicalReasoningScore = logicalReasoningScore;
    }

    public int getVerbalReasoningScore() {
        return verbalReasoningScore;
    }

    public void setVerbalReasoningScore(int verbalReasoningScore) {
        this.verbalReasoningScore = verbalReasoningScore;
    }

    public int getQuantitativeScore() {
        return quantitativeScore;
    }

    public void setQuantitativeScore(int quantitativeScore) {
        this.quantitativeScore = quantitativeScore;
    }

    @Override
    public String toString() {
        return "AptitudeTestResult{" +
                "userId='" + userId + '\'' +
                ", logicalReasoningScore=" + logicalReasoningScore +
                ", verbalReasoningScore=" + verbalReasoningScore +
                ", quantitativeScore=" + quantitativeScore +
                '}';
    }
}
