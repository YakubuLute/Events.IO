import { z } from "zod";
import { optionSchema } from "../validate";
import { professionEmailSchema, strongPasswordSchema } from "./sharedValidation";



export const signUpUniversityOrEmployerFormSchema = z
	.object({
		name: optionSchema,
		email: professionEmailSchema,
		password: strongPasswordSchema,
		confirmPassword: z.string().nonempty(),
		acceptedTerms: z.boolean({
			required_error: 'Please accept our terms and conditions',
		}),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'The passwords did not match',
				path: ['confirmPassword'],
			});
		}
	});