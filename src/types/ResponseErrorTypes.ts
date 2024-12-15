// Interface for ProblemDetails (422 or 500)
interface ProblemDetails {
    title: string;
    status: number;
    detail: string;
    errors?: ValidationError[];
  }
  
  // Interface for Error (400)
  interface CustomError {
    code: string;
    description: string;
  }
  
  interface ValidationError {
    propertyName: string;
    errorMessage: string;
  }
  