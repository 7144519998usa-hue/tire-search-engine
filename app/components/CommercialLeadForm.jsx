export default function CommercialLeadForm({ size = "", position = "", cityState = "" }) {
  return (
    <form id="commercial-quote" className="lead-form" action="/api/leads" method="post">
      <input type="hidden" name="leadType" value="commercial tire quote" />
      <input type="hidden" name="sourceSize" value={size} />
      <input type="hidden" name="sourcePosition" value={position} />
      <div className="section-heading compact-heading">
        <p className="kicker">Commercial tire quote</p>
        <h2>Need truck tires for a fleet or owner-operator vehicle?</h2>
        <p>Availability varies by region, casing, load range, and application. Send the basics and confirm specs with the retailer or supplier before purchase.</p>
      </div>
      <div className="form-grid">
        <label>Name<input name="name" autoComplete="name" /></label>
        <label>Company<input name="company" autoComplete="organization" /></label>
        <label>Phone<input name="phone" autoComplete="tel" /></label>
        <label>Email<input name="email" type="email" autoComplete="email" /></label>
        <label>Tire size<input name="tireSize" defaultValue={size} /></label>
        <label>Quantity<input name="quantity" inputMode="numeric" /></label>
        <label>Position<input name="position" defaultValue={position} /></label>
        <label>City / State<input name="cityState" defaultValue={cityState} /></label>
      </div>
      <label>Notes<textarea name="message" rows="4" placeholder="Truck type, urgency, load range, route type, or preferred retailer." /></label>
      <button className="hero-cta is-orange" type="submit">Request Truck Tire Quote</button>
      <small className="fitment-note">Confirm tire size, quantity, location, load range, and application when speaking with a supplier.</small>
    </form>
  );
}
