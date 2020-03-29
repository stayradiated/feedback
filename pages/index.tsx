import Head from 'next/head'
import { useForm, ValidationError } from '@statickit/react'
import { useRouter } from 'next/router'

interface ContactFormProps {
  product: string,
}

function ContactForm (props: ContactFormProps) {
  const { product } = props

  const [state, handleSubmit] = useForm('feedback', {
    debug: true,
    data: {
      product,
    },
  })

  if (state.succeeded) {
    return (
      <div className="mx-auto md:w-3/5 sm:w-full bg-white shadow-md rounded p-8 text-gray-900 text-center">
        Thank you for your feedback! 😁
      </div>
    )
  }

  return (
    <div className="mx-auto md:w-3/5 sm:w-full">
      <form className="bg-white shadow-md rounded p-8" onSubmit={handleSubmit}>
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
          />
          <div className="mt-4 text-red-600">
            <ValidationError
              field="email"
              prefix="Email"
              errors={state.errors}
            />
          </div>
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
          />
          <div className="mt-4 text-red-600">
            <ValidationError
              field="message"
              prefix="Message"
              errors={state.errors}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          >
            Send Feedback
          </button>
        </div>
      </form>
    </div>
  )
}

const asString = (input: string | string[]): string => {
  if (typeof input === 'string') {
    return input
  }
  if (Array.isArray(input)) {
    return asString(input[0])
  }
  return ''
}

const Home = () => {
  const router = useRouter()

  const product = asString(router.query.product)

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
