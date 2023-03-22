import { default as Ajv, ValidateFunction } from 'ajv';
import { default as addFormats } from 'ajv-formats';
import { readFileSync } from 'fs';
import { BadRequestError } from './http-error';
export class Validator<T> {
  private validator: ValidateFunction<T>;
  private ajv: Ajv;

  public constructor(typeName: string, schemaPath?: string) {
    const schemaPrefix = schemaPath ? `${schemaPath}/` : '';
    // NOTE this should be safe as in normal usage the schema typename
    // is a constant in the calling code.
    //eslint-disable-next-line security/detect-non-literal-fs-filename
    const schemaJson = readFileSync(`${schemaPrefix}${typeName}.json`);
    const schema = JSON.parse(schemaJson.toString());

    this.ajv = new Ajv({
      allErrors: true,
      verbose: true,
      coerceTypes: true,
    });
    // Add extra formats
    addFormats(this.ajv);

    this.validator = this.ajv.compile<T>(schema);
  }

  public validate(data: unknown): T {
    const success = this.validator(data);
    if (!success) {
      throw new BadRequestError('Invalid data in request', {
        ajvError: this.validator.errors,
      });
    } else {
      return data;
    }
  }
}
