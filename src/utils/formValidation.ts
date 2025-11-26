import blockConstraints from "../data/blockConstraints.json";

export type BlockType = keyof typeof blockConstraints;

export type FieldConstraint = {
  required: boolean;
  maxLength: number;
};

export type ValidationError = {
  field: string;
  message: string;
};

/**
 * Validates a single field value against block constraints
 */
export const validateField = (
  blockType: BlockType,
  fieldName: string,
  value: string
): string | null => {
  const constraints = blockConstraints[blockType] as Record<
    string,
    FieldConstraint
  >;

  if (!constraints) {
    return null;
  }

  const fieldConstraints = constraints[fieldName];

  if (!fieldConstraints) {
    return null;
  }

  // Convert value to string and handle undefined/null
  const stringValue = (value ?? "").toString();

  // Check if field is required
  if (fieldConstraints.required && stringValue.trim() === "") {
    return "This field is required";
  }

  // Check max length (even for empty strings if they're not required)
  if (
    fieldConstraints.maxLength &&
    stringValue.length > fieldConstraints.maxLength
  ) {
    return `Maximum length is ${fieldConstraints.maxLength} characters`;
  }

  return null;
};

/**
 * Validates all fields for a block type
 */
export const validateBlock = (
  blockType: BlockType,
  data: Record<string, any>
): ValidationError[] => {
  const errors: ValidationError[] = [];
  const constraints = blockConstraints[blockType] as Record<
    string,
    FieldConstraint
  >;

  if (!constraints) {
    return errors;
  }

  Object.keys(constraints).forEach((fieldName) => {
    const value = data[fieldName]?.toString() || "";
    const error = validateField(blockType, fieldName, value);

    if (error) {
      errors.push({
        field: fieldName,
        message: error,
      });
    }
  });

  return errors;
};

/**
 * Checks if a block has any validation errors
 */
export const isBlockValid = (
  blockType: BlockType,
  data: Record<string, any>
): boolean => {
  const errors = validateBlock(blockType, data);
  return errors.length === 0;
};

/**
 * Gets the constraints for a specific field
 */
export const getFieldConstraints = (
  blockType: BlockType,
  fieldName: string
): FieldConstraint | null => {
  const constraints = blockConstraints[blockType] as Record<
    string,
    FieldConstraint
  >;

  if (!constraints) {
    return null;
  }

  return constraints[fieldName] || null;
};

/**
 * Gets character count status for a field
 */
export const getCharacterCountStatus = (
  blockType: BlockType,
  fieldName: string,
  value: string
): { current: number; max: number; isOverLimit: boolean } | null => {
  const fieldConstraints = getFieldConstraints(blockType, fieldName);

  if (!fieldConstraints || !fieldConstraints.maxLength) {
    return null;
  }

  return {
    current: value.length,
    max: fieldConstraints.maxLength,
    isOverLimit: value.length > fieldConstraints.maxLength,
  };
};
