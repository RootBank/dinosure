import page from '../../components/page';

export default page(() =>
  <section className='section '>
    <div className='container content has-text-centered'>
      <h1 className='title'>Oh No!</h1>
      <p>Something has gone awefully pear shaped.</p>
      <p>Please call <a href='tel:0835551337'>083 555 1337</a> or
         email <a href='mailto:hello@dinosure.io'>hello@dinosure.io</a><br /> to open a claim.
      </p>
    </div>
  </section>
);
