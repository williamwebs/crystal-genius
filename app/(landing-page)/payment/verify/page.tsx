import Link from "next/link";
import { fulfillSuccessfulPaystackPayment } from "../../../../lib/payments";

type PaymentVerificationPageProps = {
  searchParams: Promise<{
    reference?: string;
    trxref?: string;
    drawing_id?: string;
  }>;
};

export const dynamic = "force-dynamic";

export default async function PaymentVerificationPage({
  searchParams,
}: PaymentVerificationPageProps) {
  const { drawing_id: drawingId, reference, trxref } = await searchParams;
  const paymentReference = reference || trxref;

  let heading = "We could not verify your payment";
  let message =
    "No Paystack reference was included in the return URL. If your card was charged, please contact support with your email address and payment reference.";
  let isSuccess = false;

  if (paymentReference) {
    try {
      const result = await fulfillSuccessfulPaystackPayment(paymentReference);
      heading = "Payment Successful!";
      message = `Thank you, Benson. The structural drawings have been sent to ${result.buyerEmail}.`;
      isSuccess = true;
    } catch (error) {
      console.error("Payment callback verification failed:", error);
      message =
        error instanceof Error
          ? error.message
          : "We were unable to complete your order automatically. Please contact support with your payment reference.";
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f7f7] py-20">
      <div className="mx-auto flex max-w-[500px] max-h-[300px] px-2">
        <div className="w-full rounded-[8px] border border-gray-200 bg-white p-5">
          {/* <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${
              isSuccess
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isSuccess ? "Confirmed" : "Needs Attention"}
          </span> */}
          {isSuccess && (
            <div className="w-fit mx-auto">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z"
                  fill="#DCFCE7"
                />
                <path
                  d="M45.0681 29.3333C45.6771 32.3217 45.2431 35.4286 43.8386 38.1357C42.4341 40.8429 40.144 42.9867 37.3502 44.2098C34.5563 45.4328 31.4276 45.661 28.4859 44.8565C25.5441 44.0519 22.9671 42.2632 21.1845 39.7886C19.4019 37.3139 18.5216 34.303 18.6904 31.2578C18.8591 28.2127 20.0666 25.3175 22.1117 23.0549C24.1567 20.7923 26.9156 19.2992 29.9282 18.8246C32.9409 18.35 36.0252 18.9225 38.6668 20.4467"
                  stroke="#16A34A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M28 30.6667L32 34.6667L45.3333 21.3333"
                  stroke="#16A34A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          )}

          <h1 className="mt-2 font-nunito text-[18px] text-center font-bold text-[#333333]">
            {heading}
          </h1>
          <p className="mt-3 font-nunito font-medium text-xs text-center text-[#777777]">{message}</p>

          {/* {paymentReference ? (
            <p className="mt-4 text-sm text-gray-500">
              Reference:{" "}
              <span className="font-semibold text-gray-700">
                {paymentReference}
              </span>
            </p>
          ) : null} */}

          <div className="mt-8 flex flex-wrap gap-3">
            {drawingId ? (
              <Link
                href={`/drawings`}
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-red font-normal text-white text-sm transition-colors hover:bg-red/90"
              >
                Close
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
