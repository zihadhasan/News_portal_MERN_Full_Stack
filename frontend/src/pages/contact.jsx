import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center">
        📞 Contact Us
      </h1>

      <p className="text-center text-gray-500">
        Feel free to reach out through any of the platforms below.
      </p>

      {/* CONTACT CARDS */}
      <div className="space-y-4">

        {/* EMAIL */}
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="font-bold">📧 Email</h2>
            <p>support@newsportal.com</p>
          </div>
        </div>

        {/* PHONE */}
        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="font-bold">📱 Phone</h2>
            <p>+880 1XXXXXXXXX</p>
          </div>
        </div>

        {/* FACEBOOK */}
        <div className="card bg-base-200 shadow-md">
          <div className="card-body flex flex-row items-center gap-3">

            <FaFacebook className="text-blue-600 text-xl" />

            <div>
              <h2 className="font-bold">Facebook</h2>
              <a
                href="https://facebook.com"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                facebook.com/newsportal
              </a>
            </div>

          </div>
        </div>

        {/* X (TWITTER) */}
        <div className="card bg-base-200 shadow-md">
          <div className="card-body flex flex-row items-center gap-3">

            <FaXTwitter className="text-black text-xl" />

            <div>
              <h2 className="font-bold">X (Twitter)</h2>
              <a
                href="https://x.com"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                x.com/newsportal
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}