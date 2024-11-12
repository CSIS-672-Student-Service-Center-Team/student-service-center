import "@/styles/theme.css";
import "@/styles/home.css"; // Import the new CSS file
import "@/styles/idCard.css"; // Import the new CSS file
import "@/styles/pageHeader.css"; // Import the new CSS file
import "@/styles/navBar.css"; // New CSS file for navbar

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
