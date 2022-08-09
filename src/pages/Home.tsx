import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="container">
      <Navbar />
      <figure className="d-flex justify-content-center">
        <img src="/assets/illustration.png" alt="Illustration" className="img-fluid w-75 text-center" />
      </figure>
    </div>
  );
}
