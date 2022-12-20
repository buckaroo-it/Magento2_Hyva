const paymentSubject = () => {
  let observers = [];

  let state;
  const subscribe = (observer) => {
    observers.push(observer);
    observer(state);
  };

  const unsubscribe = (observer) => {
    observers = observers.filter((item) => item !== observer);
  };

  const emit = (data) => {
    observers.forEach((observer) => {
      state = data;
      observer(data);
    });
  };
  return {
    subscribe,
    unsubscribe,
    emit,
  };
};

const paymentEvent = paymentSubject();
export default paymentEvent;
