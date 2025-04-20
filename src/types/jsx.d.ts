/// <reference types="react" />

// This file contains the JSX namespace declaration that's needed for JSX IntrinsicElements
import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
