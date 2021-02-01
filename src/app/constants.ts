export const Constants = {
  pattern: {
    mobile: /^[1-9][0-9]*$/,
    name: /^[A-Za-z][a-zA-Z ]*$/,
  },
  messages: {
    slotBooked: 'You have booked your slot successfully !',
    slotUpdated: 'You have updated your slot successfully !',
  },
  endpointUrls: {
    bookSlot: 'api/bookSlot/',
    updateSlot: 'api/updateSlot/',
    getSlots: 'assets/data/slots.json',
    getBookedSlots : 'api/getBookedSlots/',
    getSlotById : 'api/getSlotById/'
  }
};
