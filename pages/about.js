import page from '../components/page';

export default page(() =>
  <section className='section container'>
    <div className='tile is-ancestor'>
      <div className='tile is-vertical is-8'>
        <div className='tile'>
          <div className='tile is-parent is-vertical'>
            <article className='tile message is-child box'>
              <p className='title'>Who are we?</p>
              <div className='content'>Hero was founded by a bunch of people that believe that given independant, relevant advice each person can decide for themselves what to do with their money so that they and their family are better off tomorrow... and the next day... and the next day.</div>
            </article>
            <article className='tile message is-child box'>
              <p className='title'>The question ...</p>
              <div className='content'><em><strong>'Why is this so difficult?'</strong></em>
              <br />
              <br />
              We need to make life insurance easier!</div>
            </article>
          </div>
          <div className='tile is-parent'>
            <article className='tile is-child box'>
              <p className='title'>Why do we hammer on about independant advice?</p>
              <div className='content'>We believe that when you pay experts to provide quality advice you will receive quality advice. But we start questioning the advice we get from people, when they are not paid for the advice they give, but instead are paid a commission on the products they are sold. Something just feel right when this happens.</div>
            </article>
          </div>
        </div>
        <div className='tile is-parent'>
          <article className='tile is-child box'>
            <p className='title'>Where did this all start?</p>
            <div className='content'>This all started with Jowyk Muller, CEO of Hero, having a son, little Jowan. As an actuary, he thought he would just quickly go to one of the reputable insurers in South Africa, fill in some details and get his life insurance sorted. How difficult could it be right? Well, in a word, ridiculous. His life has changed, but not his insurance.</div>
          </article>
        </div>
      </div>
      <div className='tile is-parent'>
        <article className='tile message is-child box'>
          <div className='content'>
            <p className='title'>Every purchase is a vote for what a company believes.</p>
            <div className='content'>We believe that people's own money is so personal that you can't outsource that to someone else. Its time to stop sticking our heads in the sand and start taking responsibility for our own money. It is our money, we worked hard for it. Why would we not want to understand what we do with it?</div>
            <div className='content'>We believe that your finances should not be that hard. You should be able to understand it, when it is a conversation in plain english, without technical jargon, and without making you feel like an idiot.</div>
            <div className='content'>We believe that people that are hungry to change the world will change the world. The Hero community is busy changing the world. <em><strong>Are you?</strong></em></div>
          </div>
        </article>
      </div>
    </div>
  </section>
);
