const CheckoutSteps = ({ current = 0 }) => {
  return (
    <ul className="steps steps-vertical lg:steps-horizontal w-full mt-4">
      {[
        "Влизане в профил",
        "Адрес за доставка",
        "Метод на плащане",
        "Потвърждаване на Поръчка",
      ].map((step, index) => (
        <li
          key={step}
          className={`step 
                        ${index <= current ? "step-primary" : ""}
                        `}
        >
          {step}
        </li>
      ))}
    </ul>
  );
};

export default CheckoutSteps;
