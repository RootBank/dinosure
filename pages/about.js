import page from '../components/page';

export default page(() =>
  <section className='section' >
    <div className='container content'>
      <h1 className='title'>About</h1>
      <p>
          Dinosure was founded by Dennis Nedry in 2005. Alistar has long held the deep seated belief that his mother was tragically taken by a pack of velociraptors<sup><a href='#fn1' id='ref1'>1</a></sup>.
          Dinosure began as a way to ensure that no one else had to experience the same loss.
      </p>
      <p>
          Since then Dinosure has steadily grown to offer a diverse range of services. Our many satisfied customers now extend beyond those with simply dinosaur
          related concerns, and also include those who want protection from other creatures such as dragons, gorgons and manticores.
      </p>
      <p>
          The insurance component of Dinosure now operates on the <a href='http://root.co.za'><img style={{ transform: 'translate(0, 15%)', height: '1rem' }} src='https://storage.googleapis.com/root-bank/artwork/logos/dark-300x94.png' /></a> platform.
          This provides a robust foundation for serving the insurance needs of our customers faster and better.
      </p>
      <sup id='fn1'>1. Despite what the authorities might think<a href='#ref1' title='Jump back to footnote 1 in the text.'>↩</a></sup>
    </div>
  </section>
);
