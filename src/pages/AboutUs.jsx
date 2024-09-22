import React from 'react';
import EshopImage from "../assets/images/eshop-image.jpg"
import TeamMember1 from "../assets/images/team_member1.jpg"
import TeamMember2 from "../assets/images/team_member2.jpg"
import TeamMember3 from "../assets/images/team_member3.jpg"
import { useNavigate } from 'react-router-dom';
const AboutUs = () => {
    const navigate = useNavigate()
  return (
    <>
 
    <div className="bg-gray-50 min-h-screen">
      <section className="container mx-auto px-4 py-16">
        {/* Company Overview */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">About E-Shop</h1>
          <p className="text-lg text-gray-600">
            Welcome to E-Shop, your one-stop destination for the best products
            at unbeatable prices. We are dedicated to providing you with a
            seamless shopping experience.
          </p>
        </div>

        {/* Company History */}
        <section className="my-16">
          <h2 className="text-3xl font-semibold text-primary text-center mb-6">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={(EshopImage) ? EshopImage : "https://via.placeholder.com/500"}
                alt="Company History"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-lg text-gray-700">
                E-Shop started as a small family-owned business and has grown
                into a trusted online retailer. Since our inception, we have
                been committed to delivering quality products and exceptional
                customer service. Our mission is to offer our customers a wide
                selection of products, backed by excellent customer service.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="my-16 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-primary text-center mb-6">Our Mission</h2>
          <p className="text-center text-lg text-gray-700">
            At E-Shop, our mission is to bring high-quality products to your
            doorstep while ensuring customer satisfaction through an exceptional
            shopping experience. We aim to be the leading platform for all your
            shopping needs by constantly innovating and expanding our range of
            products.
          </p>
        </section>

        {/* Team Section */}
        <section className="my-16">
          <h2 className="text-3xl font-semibold text-primary text-center mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img
                src={(TeamMember1) ? TeamMember1 : "https://via.placeholder.com/150"}
                alt="Team Member 1"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-primary mb-2">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
              <p className="text-gray-500 text-sm mt-2">
                John has been at the forefront of our company's growth, leading
                us to success with his vision and leadership.
              </p>
            </div>

              {/* Team Member 3 */}
              <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img
                src={(TeamMember3) ? TeamMember3 :"https://via.placeholder.com/150"}
                alt="Team Member 3"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-primary mb-2">Ananya Pandey</h3>
              <p className="text-gray-600">Head of Marketing</p>
              <p className="text-gray-500 text-sm mt-2">
                Ananya is responsible for all our marketing strategies, helping us
                reach a global audience.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <img
                src={(TeamMember2) ? TeamMember2 :"https://via.placeholder.com/150"}
                alt="Team Member 2"
                className="w-24 h-24 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-primary mb-2">Jane Smith</h3>
              <p className="text-gray-600">Chief Operations Officer</p>
              <p className="text-gray-500 text-sm mt-2">
                Jane oversees all operations, ensuring smooth functioning and
                delivering quality to our customers.
              </p>
            </div>

          
          </div>
        </section>

        {/* Call to Action */}
        <section className="my-16 bg-primary text-white py-12 text-center rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">Join Us in Our Journey</h2>
          <p className="text-lg mb-6">
            Whether you're a loyal customer or new to our store, we are excited
            to have you on this journey with us. Shop now to experience the best
            deals.
          </p>
          <button 
          onClick={()=>navigate("/")}
          className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
            Shop Now
          </button>
        </section>
      </section>
    </div>
    </>
  );
};

export default AboutUs;
