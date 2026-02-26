import React from "react";
import { motion } from "motion/react";

// 1. Configuration Data: easy to edit text and images here
const testimonialsData = [
  {
    name: "Sarah Chen",
    role: "Senior Full Stack Engineer",
    company: "Google",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&h=200&auto=format&fit=crop",
    description:
      "The scalable architecture solutions provided have significantly reduced our latency. The seamless integration with our existing CI/CD pipelines made the transition effortless for the entire engineering team.",
    duration: 1.5, // Animation speed
  },
  {
    name: "David Miller",
    role: "DevOps Architect",
    company: "Microsoft",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
    description:
      "Automating our cloud infrastructure deployment has cut our production time by 40%. The robust security protocols and container orchestration support are exactly what an enterprise environment needs.",
    duration: 2,
  },
  {
    name: "Emily Davis",
    role: "AI/ML Data Scientist",
    company: "OpenAI",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
    description:
      "Processing large datasets for our neural networks became much more efficient. The optimized GPU allocation and data pre-processing tools allowed us to train models faster than ever before.",
    duration: 2.5,
  },
  {
    name: "James Wilson",
    role: "Product Manager",
    company: "Amazon Web Services",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop",
    description:
      "Managing cross-functional teams and tracking sprint velocity has never been clearer. The analytics dashboard gives us real-time insights into code quality and feature deployment progress.",
    duration: 3,
  },
  {
    name: "James Wilson",
    role: "Product Manager",
    company: "Amazon Web Services",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop",
    description:
      "Managing cross-functional teams and tracking sprint velocity has never been clearer. The analytics dashboard gives us real-time insights into code quality and feature deployment progress.",
    duration: 3,
  },
  {
    name: "James Wilson",
    role: "Product Manager",
    company: "Amazon Web Services",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&h=200&auto=format&fit=crop",
    description:
      "Managing cross-functional teams and tracking sprint velocity has never been clearer. The analytics dashboard gives us real-time insights into code quality and feature deployment progress.",
    duration: 3,
  },
];

// 2. Helper Component for Stars
const StarRating = () => (
  <div className="flex gap-0.5 justify-center pt-4">
    {[...Array(5)].map((_, index) => (
      <svg
        key={index}
        width="18"
        height="18"
        viewBox="0 0 22 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z"
          fill="#FF532E"
        />
      </svg>
    ))}
  </div>
);

// 3. Reusable Card Component
const TestimonialCard = ({ data }) => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: data.duration,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      className="text-sm w-full max-w-[320px] border border-gray-500/30 pb-8 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col items-center px-5 py-4 relative">
        <img
          className="h-24 w-24 object-cover absolute -top-12 rounded-full border-4 border-white shadow-md"
          src={data.image}
          alt={data.name}
        />
        <div className="pt-12 text-center">
          <h1 className="text-lg font-bold text-gray-800">{data.name}</h1>
          <p className="text-gray-800/80 font-medium">{data.role}</p>
          <p className="text-xs text-gray-500 mt-1">{data.company}</p>
        </div>
      </div>

      <p className="text-gray-600 px-6 text-center leading-relaxed italic">
        "{data.description}"
      </p>

      <StarRating />
    </motion.div>
  );
};

// 4. Main Component
const Testimonial = () => {
  return (
    <div className="flex flex-wrap justify-center gap-10 pt-20 pb-16 px-4 ">
      {testimonialsData.map((testimonial, index) => (
        <TestimonialCard key={index} data={testimonial} />
      ))}
    </div>
  );
};

export default Testimonial;
