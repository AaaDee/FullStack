import { Button, Grid } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { DiagnosisSelection, Option, SelectField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { HealthCheckEntry, HealthCheckRating } from "../types";

export type HealthCheckFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
  onSubmit: (values: HealthCheckFormValues) => void;
}

const healthCheckRatingOptions: Option[] =  [
  { value: HealthCheckRating.CriticalRisk, label: "Critical" },
  { value: HealthCheckRating.LowRisk, label: "Low" },
  { value: HealthCheckRating.HighRisk, label: "High" },
  { value: HealthCheckRating.Healthy, label: "Healthy" },
];

const typeOptions: Option[] =  [
  { value: "HealthCheck", label: "Health check" },
];

export const EntryForm = ({ onSubmit }: Props) => {
  const [{ diagnoses }, ] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: "",
        type: "HealthCheck",
        date: "",
        specialist: "",
        healthCheckRating: HealthCheckRating.CriticalRisk
      }}
      onSubmit={onSubmit}
      validate={(_values) => {
        const errors: { [field: string]: string } = {};
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched  }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              input='text'
            />
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              input='text'
            />
            <Field
              label="Specialist"
              placeholder="specialist"
              name="specialist"
              input='text'
            />
            <DiagnosisSelection 
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label="HealthCheckRating" name="healthCheckRating" options={healthCheckRatingOptions} />
            <SelectField label="type" name="type" options={typeOptions} />
            <Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EntryForm;
