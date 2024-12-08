package com.aicareercounsellor.demo.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Data
@ToString
public class AptitudeTestResult {
    private String userId;
    private int logicalReasoningScore;
    private int verbalReasoningScore;
    private int quantitativeScore;
}
