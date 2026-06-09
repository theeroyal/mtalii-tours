export default function WhatsAppButton() {
  const phoneNumber = '254742932438'; // Replace with your WhatsApp number
  const message = encodeURIComponent('Hi! I\'m interested in booking a tour with Mtalii Tours');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110"
    >
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.488-.493-.67-.493-.173 0-.371.05-.57.148-.199.099-.767.767-.767 1.863s.787 2.183.887 2.332c.1.149 1.372 2.092 3.321 2.934.467.203.844.324 1.132.415.476.148.908.127 1.249.078.381-.055 1.758-.717 2.008-1.412.25-.695.25-1.287.173-1.412-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.899a9.82 9.82 0 012.899 6.992c.002 5.449-4.435 9.883-9.885 9.883z"/>
      </svg>
    </a>
  );
}
