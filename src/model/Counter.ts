import { parseYaml } from "obsidian";
import {
    validateDataWithSchema,
    ValidationError,
} from "@utils/JsonSchemaValidator";
import { ComponentWrapper } from "@model/ComponentWrapper";
import counterSchemaYaml from "@model/schemas/Counter.yaml";

type HideButtonsType = true | false | "true" | "false" | "neither" | "both" | "plus" | "minus" | undefined;
type StyleType = "default" | "horizontal" | "vertical" | undefined;
export class Counter extends ComponentWrapper {
    name_top: string;
    name_bottom: string;
    current_value: number;
    max_value?: number;
    min_value: number;
    auto_save: boolean;
    name_top_height: number;
    name_bottom_height: number;
    value_height: number;
    hide_buttons: HideButtonsType;
    style: StyleType;

    public static parseYaml(source: string) {
        try {
            // Validate YAML content against YAML schema (all dependencies pre-registered)
            const validation = validateDataWithSchema(
                source,
                counterSchemaYaml
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
            return Counter.parse(data);
        } catch (error: any) {
            throw new Error("Invalid YAML format: " + error.message);
        }
    }

    public static parse(data: any): Counter {
        return new Counter(
            data.collapsible,
            data.collapse_default,
            data.max_value,
            data.current_value,
            data.min_value,
            data.name_top,
            data.name_bottom,
            data.auto_save,
            data.value_height,
            data.name_top_height,
            data.name_bottom_height,
            data.hide_buttons,
            data.style,
        );
    }

    constructor(
        collapsible: boolean,
        collapse_default: boolean,
        max_value: number | undefined,
        current_value: number,
        min_value: number,
        name_top: string,
        name_bottom: string,
        auto_save: boolean,
        value_height: number,
        name_top_height: number,
        name_bottom_height: number,
        hide_buttons: HideButtonsType,
        style: StyleType,
    ) {
        super(collapsible, collapse_default);
        this.min_value = min_value ?? undefined;
        this.max_value = max_value ?? undefined;
        if (max_value && current_value > max_value) { this.current_value = max_value}
        else if (max_value && current_value < min_value) { this.current_value = min_value}
        else {this.current_value = current_value ?? 0}
        this.name_top = name_top;
        this.name_bottom = name_bottom;
        this.auto_save = auto_save ?? false;
        this.value_height = value_height ?? 1;
        this.name_top_height = name_top_height ?? 1;
        this.name_bottom_height = name_bottom_height ?? 1;
        this.hide_buttons = hide_buttons ?? 'neither';
        this.style = style ?? 'default';
    }
}
