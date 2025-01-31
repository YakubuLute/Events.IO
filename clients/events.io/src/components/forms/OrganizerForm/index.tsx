import {useCreateOrganizer} from "../../../mutations/useCreateOrganizer";
import {useGetAccount} from "../../../queries/useGetAccount";
import {useForm, UseFormReturnType} from "@mantine/form";
import {Organizer} from "../../../types";
import {useEffect} from "react";
import {LoadingContainer} from "../../common/LoadingContainer";
import {t} from "@lingui/macro";
import {InputGroup} from "../../common/InputGroup";
import {Button, Group, Select, TextInput} from "@mantine/core";
import {currencies} from "../../../../data/currencies";
import {timezones} from "../../../../data/timezones";
import {useFormErrorResponseHandler} from "../../../hooks/useFormErrorResponseHandler";
import {useGetMe} from "../../../queries/useGetMe";

interface OrganizerFormProps {
    onSuccess?: (organizer: Organizer) => void;
    onCancel?: () => void;
}

export const OrganizerForm = ({form}: { form: UseFormReturnType<Partial<Organizer>> }) => {
    return (
        <>
            <InputGroup>
                <TextInput
                    {...form.getInputProps('name')}
                    required
                    label={t`Organizer Name`}
                    placeholder={t`Awesome Organizer Ltd.`}
                />
                <TextInput
                    {...form.getInputProps('email')}
                    label={t`Email`}
                    placeholder={t`hello@awesome-events.com`}
                />
            </InputGroup>
            <InputGroup>
                <Select
                    {...form.getInputProps('currency')}
                    searchable
                    required
                    data={Object.entries(currencies).map(([key, value]) => ({
                        value: value,
                        label: key,
                    }))}
                    label={t`Currency`}
                    placeholder={t`EUR`}
                    description={t`The default currency for your events.`}
                />
                <Select
                    {...form.getInputProps('timezone')}
                    searchable
                    required
                    data={timezones}
                    label={t`Timezone`}
                    placeholder={t`UTC`}
                    description={t`The default timezone for your events.`}
                />
            </InputGroup>
        </>
    )
}

export const OrganizerCreateForm = ({onSuccess}: OrganizerFormProps) => {
    const organizerMutation = useCreateOrganizer();
    const {data: account, isFetched: accountFetched} = useGetAccount();
    const {data: me, isFetched: meFetched} = useGetMe();
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            currency: '',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
    });

    const handleSubmit = (values: Partial<Organizer>) => {
        organizerMutation.mutate({
            organizerData: values,
        }, {
            onSuccess: ({data: organizer}) => {
                if (onSuccess) {
                    onSuccess(organizer);
                }
            },
            onError: (error: any) => {
                useFormErrorResponseHandler()(form, error);
            }
        });
    }

    useEffect(() => {
        if (meFetched) {
            form.setFieldValue('currency', String(account?.currency_code));
        }
        if (accountFetched) {
            form.setFieldValue('email', String(me?.email));
            form.setFieldValue('timezone', String(me?.timezone));
        }
    }, [accountFetched, meFetched]);

    return (
        <LoadingContainer>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <fieldset disabled={organizerMutation.isPending || !accountFetched || !meFetched}>
                    <OrganizerForm form={form as any}/>

                    <Group gap={10}>
                        <Button fullWidth loading={organizerMutation.isPending}
                                type={'submit'}
                                color={'green'}>{t`Create Organizer`}
                        </Button>
                    </Group>
                </fieldset>
            </form>
        </LoadingContainer>
    );
}
