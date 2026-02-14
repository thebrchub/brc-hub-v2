export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sanket Joshi",
    role: "Principal Chartered Accountant",
    company: "Sanket Milind Joshi & Co.",
    content: "The AI analyzer BRC Hub built has revolutionized how we handle tax orders. What used to take hours of manual reading now takes seconds. The accuracy of the legal entity extraction is impressive and has saved us hundreds of man-hours.",
    // Generates a professional icon with initials "SJ"
    image: "https://ui-avatars.com/api/?name=Sanket+Joshi&background=FF5722&color=fff"
  },
  {
    name: "Managing Director",
    role: "Director",
    company: "Powerbird Elevators",
    content: "We wanted a website that reflected our engineering precision, not just another static page. The 'Lift Intro' animation and the premium dark theme completely set us apart from competitors. Our service inquiries have noticeably increased since launch.",
    // Generates icon with initials "MD"
    image: "https://ui-avatars.com/api/?name=Managing+Director&background=FF5722&color=fff"
  },
  {
    name: "Himanshu Agrawal",
    role: "Director",
    company: "LVC LegalVala Consultancy",
    content: "Our digital presence was minimal before BRC Hub. They didn't just build a site; they built a lead generation machine. The new platform is fast, looks professional, and most importantly, clients are finding us on Google much easier now.",
    // Generates icon with initials "LA"
    image: "https://ui-avatars.com/api/?name=Himanshu+Agrawal&background=FF5722&color=fff"
  },
  {
    name: "Orvexa Director",
    role: "Director",
    company: "Orvexa Softech Pvt Ltd",
    content: "We needed the Quantacel product site up in record time, and BRC Hub delivered without compromising quality. The React build is incredibly fast and responsive. A reliable technology partner for our product launches.",
    image: "https://ui-avatars.com/api/?name=Orvexa+Director&background=FF5722&color=fff"
  }
];