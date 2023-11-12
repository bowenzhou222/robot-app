export default class GameReporter {
  private report: (result: string) => void;

  constructor(report: (result: string) => void) {
    this.report = report;
  }

  generateReport(result: string): void {
    this.report(result);
  }
}
