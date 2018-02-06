import page from '../components/page';

export default page(() => (
  <section className='section' >
    <div className='container content'>
      <h1 className='title'>Contact Us</h1>
      <p>
        Dinosure is a registered insurance product. As such we have a responsibility to treat our customers fairly and timeously.
        If you are experiencing problems with our service, would like to appeal a claim, or simply have questions, you can
        contact us via the following channels:
      </p>
      <ul>
        <li>email <a href='mailto:hello@dinosure.io'>hello@dinosure.io</a></li>
        <li>telephone <a href='tel:0875509861'>087 550 9861</a></li>
      </ul>
      <p>
        If we have not sucessfully adressed your concerns, you can foward your issue to the <a href='http://www.ombud.co.za/'>Ombudsman for Long-term Insurance</a>.
      </p>
    </div>
  </section>
));
