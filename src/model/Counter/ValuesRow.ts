import {parseYaml} from "obsidian";
import {
    validateDataWithSchema,
    ValidationError,
} from "@utils/JsonSchemaValidator";
import {ComponentWrapper} from "@model/ComponentWrapper";
import valuesRowSchemaYaml from "@model/schemas/ValuesRow.yaml";
import {HideButtonsType, StyleType} from "./types";

export interface CounterConfig {
    name_top?: string;
    name_bottom: string;
    current_value?: number;
    max_value?: number;
    min_value?: number;
    hide_buttons?: HideButtonsType;
}

export class ValuesRow extends ComponentWrapper {
    counters: CounterConfig[];
    value_height: number;
    name_top_height: number;
    name_bottom_height: number;
    style: StyleType;

    public static parseYaml(source: string) {
        try {
            // Validate YAML content against YAML schema (all dependencies pre-registered)
            const validation = validateDataWithSchema(
                source,
                valuesRowSchemaYaml
            );
            if (!validation.valid) {
                const errorMessages = validation.errors
                    .map(
                        (error: ValidationError) =>
                            `${error.path}: ${error.message}`
                    )
                    .join(", ");
                throw new Error("Schema validation failed: " + errorMessages);
            }

            // Parse the YAML after validation
            const data = parseYaml(source);
            return ValuesRow.parse(data);
        } catch (error: any) {
            throw new Error("Invalid YAML format: " + error.message);
        }
    }

    public static parse(data: any): ValuesRow {
        const counters = (data.counters || []).map((counter: any) => ({
            name_top: counter.name_top,
            name_bottom: counter.name_bottom || counter.name,
            current_value: counter.current_value,
            max_value: counter.max_value,
            min_value: counter.min_value,
            hide_buttons: counter.hide_buttons,
        }));

        return new ValuesRow(
            data.collapsible,
            data.collapse_default,
            counters,
            data.value_height,
            data.name_top_height,
            data.name_bottom_height,
            data.style
        );
    }

    constructor(
        collapsible: boolean,
        collapse_default: boolean,
        counters: CounterConfig[],
        value_height: number,
        name_top_height: number,
        name_bottom_height: number,
        style: StyleType
    ) {
        super(collapsible, collapse_default);
        this.counters = counters;
        this.value_height = value_height ?? 3;
        this.name_top_height = name_top_height ?? 1;
        this.name_bottom_height = name_bottom_height ?? 1;
        this.style = style ?? "horizontal";
    }
}
