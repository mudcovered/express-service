import { default as Ajv, ValidateFunction } from 'ajv';
import { default as addFormats } from 'ajv-formats';
import { readFileSync } from 'fs';
import { BadRequestError } from './http-error';
export class Validator<T> {
  private validator: ValidateFunction;
  private ajv: Ajv;

  public constructor(typeName: string, schemaPath?: string) {
    const schemaPrefix = schemaPath ? `${schemaPath}/` : '';
    const schemaJson = readFileSync(`${schemaPrefix}${typeName}.json`);
    const schema = JSON.parse(schemaJson.toString());

    this.ajv = new Ajv({
      allErrors: true,
      verbose: true,
      coerceTypes: true,
    });
    // Add extra formats
    addFormats(this.ajv);

    this.validator = this.ajv.compile(schema);
  }

  public validate(data: unknown): T {
    const success = this.validator(data);
    if (!success) {
      throw new BadRequestError(this.ajv.errorsText(this.validator.errors));
    }

    // Safe conversion validator proves that this is the correct type
    return data as T;
  }
}
