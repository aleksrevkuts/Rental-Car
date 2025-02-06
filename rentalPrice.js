
function price(pickup, dropoff, pickupDate, dropoffDate, type, age, licenseYears) {
    const carType = getCarType(type);
    const days = getDays(pickupDate, dropoffDate);
    const season = getSeason(pickupDate, dropoffDate);
  
    if (age < 18) {
      return "Driver too young - cannot quote the price";
  }
  
  if (age <= 21 && carType !== "Compact") {
      return "Drivers 21 y/o or less can only rent Compact vehicles";
  }
  
  if (licenseYears < 1) {
      return "Driver must hold a license for at least one year";
  }
  
  let rentalprice = age * days;
  
  if (carType === "Racer" && age <= 25 && season === "High") {
      rentalprice *= 1.5;
  }
  
  if (season === "High") {
      rentalprice *= 1.15;
  }
  
  if (days > 10 && season === "Low") {
      rentalprice *= 0.9;
  }
  
  rentalprice = addLicensePenalty(rentalprice, licenseYears, days, season);
  
  return '$' + rentalprice;
  }
  
  function addLicensePenalty(price, licenseYears, days, season) {
      if (licenseYears < 2) {
          price *= 1.3;
      }
      if (licenseYears < 3 && season === "High") {
          price += 15 * days;
      }
      return price;
    }
  
    function getCarType(type) {
      const carTypes = {
          Compact: "Compact",
          Electric: "Electric",
          Cabrio: "Cabrio",
          Racer: "Racer"
      };
      
      return carTypes[type] || "Unknown";
  }
  
  function getDays(pickupDate, dropoffDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(pickupDate);
    const secondDate = new Date(dropoffDate);
  
    return Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1;
  }
  
  function getSeason(pickupDate, dropoffDate) {
    const pickupMonth = new Date(pickupDate).getMonth();
    const dropoffMonth = new Date(dropoffDate).getMonth();
    
    const isHighSeason = (pickupMonth >= 3 && pickupMonth <= 9) || (dropoffMonth >= 3 && dropoffMonth <= 9);
    
    return isHighSeason ? "High" : "Low";
}

  
  exports.price = price;