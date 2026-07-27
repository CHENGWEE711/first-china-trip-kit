import assert from "node:assert/strict";
import test from "node:test";
import {
  arrivalReadinessQuestions,
  getArrivalReadinessResult,
} from "../lib/arrival-readiness.ts";

test("arrival readiness score is deterministic, totals 100, and keeps unresolved categories actionable", () => {
  assert.equal(arrivalReadinessQuestions.length, 12);
  assert.equal(arrivalReadinessQuestions.reduce((sum, item) => sum + item.weight, 0), 100);

  const noneReady = getArrivalReadinessResult({});
  assert.equal(noneReady.score, 0);
  assert.equal(noneReady.status, "needs-attention");
  assert.equal(noneReady.todos.length, 12);
  assert.ok(noneReady.risks.red.length > 0);
  assert.ok(noneReady.risks.yellow.length > 0);

  const allReady = getArrivalReadinessResult(
    Object.fromEntries(arrivalReadinessQuestions.map((question) => [question.id, true])),
  );
  assert.equal(allReady.score, 100);
  assert.equal(allReady.status, "ready");
  assert.equal(allReady.todos.length, 0);
  assert.equal(allReady.risks.green.length, 12);
  assert.equal(allReady.risks.red.length, 0);
});

test("arrival readiness never assigns score to unanswered or false items", () => {
  const firstQuestion = arrivalReadinessQuestions[0];
  const result = getArrivalReadinessResult({ [firstQuestion.id]: true });
  assert.equal(result.score, firstQuestion.weight);
  assert.equal(result.completedCount, 1);
  assert.equal(result.todos.length, 11);
  assert.ok(result.todos.every((item) => item.guide.href.startsWith("/")));
});
