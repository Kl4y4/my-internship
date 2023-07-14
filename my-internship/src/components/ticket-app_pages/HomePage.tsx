
const HomePage = () => {

  return <>
    <div id="main" style={{ textAlign: 'center' }}>
      <h2>Main</h2>
      <p>Jesteśmy firmą organizującą wydarzenia i witamy Cię na naszej stronie.</p>
      <section style={{ columns: '3' }}>
        <div>To nasze zalety</div>
        <div>To nasze wady</div>
        <div>a to nasz opis</div>
      </section>
      <section>
        <div>To nasi klienci</div>
        <div id="customers" style={{ columns: '3' }}>
          <div>klient 1</div>
          <div>klient 2</div>
          <div>klient 3</div>
        </div>
      </section>
    </div>
  </>

}

export default HomePage