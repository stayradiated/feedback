import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  useNetlifyForm,
  NetlifyFormProvider,
  NetlifyFormComponent,
  Honeypot,
} from 'react-netlify-forms'

interface ContactFormProps {
  product: string
}

function ContactForm(props: ContactFormProps) {
  const { product } = props

  const netlify = useNetlifyForm({
    name: 'Contact',
    action: '/',
    honeypotName: 'deep-boop',
    onSuccess: (response, context) => {
      console.log(response, context)
      console.log('Successfully sent form data to Netlify Server')
    },
  })

  const handleSubmit = (event: React.FormEvent) => {
    netlify.handleSubmit(event, {
      product,
    })
  }

  if (netlify.success) {
    return (
      <div className="mx-auto md:w-3/5 sm:w-full bg-white shadow-md rounded p-8 text-gray-900 text-center">
        Thank you for your feedback! 😊
      </div>
    )
  }

  return (
    <NetlifyFormProvider {...netlify}>
      <NetlifyFormComponent onSubmit={handleSubmit}>
        <div className="mx-auto md:w-3/5 sm:w-full">
          <div className="bg-white shadow-md rounded p-8">
            <Honeypot />
            <input type="hidden" name="product" value="product" />
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                name="name"
                onChange={netlify.handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="email"
                name="email"
                required
                onChange={netlify.handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message*
              </label>
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="I'm a human. Please be nice."
                name="message"
                minLength={20}
                rows={7}
                required
                autoFocus
                onChange={netlify.handleChange}
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              >
                Send Feedback
              </button>
            </div>
            {netlify.error && (
              <div className="bg-red-50 border-2 border-red-400 rounded p-4 text-center">
                <p>⚠️ Sorry, there was an issue sending your message. ⚠️</p>
                <p>You can email me at george (at) czabania.com</p>
              </div>
            )}
          </div>
        </div>
      </NetlifyFormComponent>
    </NetlifyFormProvider>
  )
}

const asString = (input: string | string[] | undefined): string => {
  if (typeof input === 'string') {
    return input
  }

  if (Array.isArray(input) && input.length > 0) {
    return asString(input[0])
  }

  return ''
}

const Home = () => {
  const router = useRouter()
  const product = asString(router.query['product'])

  const title =
    typeof product === 'string' && product.trim().length > 0
      ? `Feedback for ${product.trim()}`
      : `Feedback`

  return (
    <div className="flex flex-col items-center h-screen bg-gray-800">
      <Head>
        <title>{title} - George Czabania</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="//brick.freetls.fastly.net/Source+Sans+Pro:400,700"
        />
      </Head>

      <h2 className="container font-bold text-m py-3 border-b-2 border-gray-700">
        <a
          className="mx-3 text-gray-500 hover:text-blue-400"
          href="https://george.czabania.com"
        >
          george.czabania
        </a>
      </h2>

      <main className="container font-sans text-gray-900 antialiased leading-tight">
        <header className="mt-12 text-white text-center my-5">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="my-2">I appreciate your feedback 🙌</p>
        </header>
        <ContactForm product={product} />
      </main>
    </div>
  )
}

export default Home
