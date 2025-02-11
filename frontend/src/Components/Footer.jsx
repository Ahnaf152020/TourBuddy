import { useState } from "react"
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter } from "react-icons/fa"
import { IoMdArrowDropdown } from "react-icons/io"
import { Link } from "react-router-dom"

const Footer = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState({ code: "GB", name: "English (UK)" })
  const [selectedCurrency, setSelectedCurrency] = useState({ code: "USD", symbol: "$", name: "U.S. Dollar" })

  const languages = [
    { code: "GB", name: "English (UK)" },
    { code: "US", name: "English (US)" },
    { code: "ES", name: "Español" },
    { code: "FR", name: "Français" },
  ]

  const currencies = [
    { code: "USD", symbol: "$", name: "U.S. Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  ]

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
    setIsLanguageOpen(false)
  }

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency)
    setIsCurrencyOpen(false)
  }

  return (
    <footer className="bg-[#13253F] text-gray-300 pt-12">
      {/* Main Footer */}
      <div className="container mx-auto px-10 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Language and Currency Section */}
          <div className="space-y-4">
            <div className="relative">
              <h3 className="text-white mb-3">Language</h3>
              <button
                className="w-full flex items-center justify-between border border-gray-600 rounded p-2 hover:border-gray-400"
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              >
                <span className="flex items-center gap-2">
                  <span>{selectedLanguage.name}</span>
                </span>
                <IoMdArrowDropdown className={`h-5 w-5 transition-transform ${isLanguageOpen ? "rotate-180" : ""}`} />
              </button>
              {isLanguageOpen && (
                <div className="absolute z-10 w-full mt-1 bg-[#1B2B3A] border border-gray-600 rounded shadow-lg">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700"
                      onClick={() => handleLanguageSelect(language)}
                    >
                      {language.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <h3 className="text-white mb-3">Currency</h3>
              <button
                className="w-full flex items-center justify-between border border-gray-600 rounded p-2 hover:border-gray-400"
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              >
                <span>{`${selectedCurrency.name} (${selectedCurrency.symbol})`}</span>
                <IoMdArrowDropdown className={`h-5 w-5 transition-transform ${isCurrencyOpen ? "rotate-180" : ""}`} />
              </button>
              {isCurrencyOpen && (
                <div className="absolute z-10 w-full mt-1 bg-[#1B2B3A] border border-gray-600 rounded shadow-lg">
                  {currencies.map((currency) => (
                    <button
                      key={currency.code}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700"
                      onClick={() => handleCurrencySelect(currency)}
                    >
                      {`${currency.name} (${currency.symbol})`}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/press" className="hover:text-white">
                  Press Room
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-white mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-white">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment Methods Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-white mb-4">Payment methods possible</h3>
              <div className="grid grid-cols-5 gap-2">
                <img
                  src="payment/master-card.png"
                  alt="Mastercard"
                  width={50}
                  height={30}
                  className="object-contain"
                />
                <img
                  src="payment/bitpay.png"
                  alt="Bitpay"
                  width={50}
                  height={30}
                  className="object-contain"
                />
                <img
                  src="payment/visa.png"
                  alt="Visa"
                  width={50}
                  height={30}
                  className="object-contain"
                />
                <img
                  src="payment/american-express.png"
                  alt="American Express"
                  width={50}
                  height={30}
                  className="object-contain"
                />
                <img
                  src="payment/discover.png"
                  alt="Discover"
                  width={50}
                  height={30}
                  className="object-contain"
                />
                <img
                  src="payment/image.png"
                  alt="Union Pay"
                  width={50}
                  height={30}
                  className="object-contain"
                />
                <img
                  src="payment/gpay.png"
                  alt="Google Pay"
                  width={50}
                  height={30}
                  className="object-contain"
                />
                <img
                  src="payment/apple-pay.png"
                  alt="Apple Pay"
                  width={50}
                  height={30}
                  className="object-contain"
                />
                <img
                  src="payment/paypal.png"
                  alt="PayPal"
                  width={50}
                  height={30}
                  className="object-contain"
                />
                <img
                  src="payment/sofort.png"
                  alt="PayPal"
                  width={50}
                  height={30}
                  className="object-contain"
                />
              </div>
            </div>
            <div>
              <h3 className="text-white mb-4">Company</h3>
              <Link to="/become-guide" className="hover:text-white">
                Become a Tour guide for Us
              </Link>
            </div>
          </div>
        </div>

      </div>
      {/* Footer Bottom */}
      <div style={{ background: 'rgba(0, 0, 0, 0.20)' }} className="mt-12 py-4 md:px-44 px-10 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">Copyright 2025 <Link to='https://github.com/ali-ahnaf/cse-3100' className="text-yellow-600 font-semibold cursor-pointer">Tour Buddy</Link>. All Rights Reserved</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-white">
            <FaFacebookF className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="#" className="hover:text-white">
            <FaTwitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="hover:text-white">
            <FaInstagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="#" className="hover:text-white">
            <FaPinterestP className="h-6 w-6" />
            <span className="sr-only">Pinterest</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

