/**
 * Test metadata interface
 * Provides basic properties for test identification
 */
export interface ITest {
  testName: string;
  description?: string;
  tags?: string[];
  result?: {
    message: string;
  };
}
