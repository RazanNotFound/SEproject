function Footer() {
  return (
    <footer className="w-full text-center py-4 bg-gray-900/30 text-gray-300 mt-12">
      <div>
        &copy; {new Date().getFullYear()} All rights reserved. | Follow us on Instagram <a href="https://instagram.com/notrazanghanem" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">@notrazanghanem</a>
      </div>
    </footer>
  );
}
export default Footer;