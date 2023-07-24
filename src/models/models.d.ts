// Application Agnostic Types
export interface IFetchRequest {
    url: string;
    fetchOptions?: RequestInit;
    /**
     * displayed if error occurs, so caller doesn't have to catch.
     */
    errorMessage?: string;
    /**
     * true- disable json parsing of response body.
     */
    raw?: boolean;
  }
  
  type TableItem<T = Record<string, unknown>> = T & {
    selected: boolean;
  };
  
  type Selectable<Type> = Type & {
    selected: boolean;
  };
  
  type Nullable<T> = T | null;
  
  // Application Specific Types
  