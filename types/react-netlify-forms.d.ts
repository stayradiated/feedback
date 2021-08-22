declare module 'react-netlify-forms' {
  import type React from 'react'

  type UseNetlifyFormProps = {
    name?: string
    action?: string
    honeypotName?: string
    enableRecaptcha?: boolean
    onSuccess?: () => void
    onFailure?: () => void
  }

  type NetlifyFormState = {
    success: boolean
    error: boolean
    submitting: boolean
    submitted: boolean
    response: null
    values: Record<string, unknown>
    formName: string
    formAction: string
    honeypotName: string
    recaptchaEnabled: boolean
    recaptchaInvisible: boolean
  }

  type NetlifyFormContext = NetlifyFormState & {
    handleChange: React.ChangeEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    >
    handleSubmit: () => void
    handleReset: () => void
    setHoneypotName: (honeypotName: string) => void
    enableRecaptcha: (enable: boolean) => void
    formRef: React.Ref<HTMLFormElement>
    recaptchaRef: React.Ref<unknown>
  }

  type HoneypotProps = React.HTMLProps<HTMLInputElement> & {
    label?: string
  }

  type NetlifyFormComponentProps = React.HTMLProps<HTMLFormElement> & {
    children: (context: NetlifyFormContext) => React.ReactNode
  }

  type NetlifyFormProps = UseNetlifyFormProps & {
    formProps?: Omit<NetlifyFormComponentProps, 'children'>
    children: (context: NetlifyFormContext) => React.ReactNode
  }

  type NetlifyFormProviderProps = NetlifyFormContext & {
    children: React.ReactNode
  }

  type RecaptchaProps = Record<string, unknown> & {
    siteKey?: string
    invisible?: boolean
  }

  const Honeypot: React.FunctionComponent<HoneypotProps>
  const NetlifyForm: React.FunctionComponent<NetlifyFormProps>
  const NetlifyFormComponent: React.FunctionComponent<NetlifyFormComponentProps>
  const NetlifyFormProvider: React.FunctionComponent<NetlifyFormProviderProps>
  const useNetlifyFormContext: () => NetlifyFormContext
  const Recaptcha: React.FunctionComponent<RecaptchaProps>

  export {
    Honeypot,
    NetlifyForm,
    NetlifyFormComponent,
    NetlifyFormProvider,
    useNetlifyFormContext,
    Recaptcha,
  }
}
