import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, Clock, ArrowLeft, Facebook, Twitter, Linkedin } from 'lucide-react';
import Button from '@components/common/Button';

const BlogPost = () => {
    const { id } = useParams();

    // Mock Blog Post Data
    const post = {
        title: "The Art of Slow Living: Embracing Artisan Craftsmanship",
        category: "Lifestyle",
        author: "Sarah Jenkins",
        date: "October 14, 2026",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1200&q=80",
        content: `
            <p class="lead text-xl text-gray-600 mb-8 font-serif italic">In a world obsessed with speed and instant gratification, there is a quiet revolution taking place—a return to quality, patience, and the human touch.</p>

            <p class="mb-6">The concept of "slow living" isn't about doing everything at a snail's pace. It's about doing everything at the <em>right</em> speed. It's about savoring the hours and minutes rather than just counting them. When it comes to the objects we surround ourselves with, this philosophy translates into a deep appreciation for artisan craftsmanship.</p>

            <h3 class="text-2xl font-serif text-[#1a3a3a] mt-10 mb-4">Why Handcrafted Matters</h3>
            
            <p class="mb-6">Factory-made products often lack a soul. They are uniform, perfect in a sterile way, and designed for obsolescence. An artisan-made object, however, carries the fingerprint of its creator—sometimes literally. Variations in glaze on a ceramic mug, the grain pattern in a hand-turned wooden bowl, or the stitching on a leather bag tell a story of material, place, and person.</p>

            <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80" alt="Potter working" class="w-full h-auto rounded-lg my-8 shadow-md" />

            <p class="mb-6">Supporting artisans means supporting a different economic model—one that values skill preservation, fair wages, and sustainable practices over mass production and cost-cutting. It creates a connection between the maker and the user that is completely absent in the big-box retail experience.</p>

            <h3 class="text-2xl font-serif text-[#1a3a3a] mt-10 mb-4">Curating Your Sanctuary</h3>
            
            <p class="mb-6">Start small. Replace your mass-produced coffee mug with one thrown by a local potter. Feel the difference in weight and texture every morning. Invest in a woolen throw blanket woven on a loom rather than a synthetic one. These small shifts change how you interact with your environment.</p>

            <blockquote class="border-l-4 border-[#d4af37] pl-6 py-2 my-10 bg-[#f8f6f0] p-6 italic font-serif text-lg text-gray-700">
                "Have nothing in your house that you do not know to be useful, or believe to be beautiful." <br/> <span class="text-sm not-italic font-bold mt-2 block">— William Morris</span>
            </blockquote>

            <p class="mb-6">At Artisio, we believe that every object should spark joy and serve a purpose. Our community of makers pours their passion into creating pieces that are meant to be cherished, repaired, and passed down—not discarded after a season.</p>
        `,
        tags: ['Craftsmanship', 'Sustainability', 'Home Decor', 'Mindfulness']
    };

    return (
        <div className="bg-white min-h-screen">
            {/* Header Image */}
            <div className="h-[40vh] md:h-[50vh] relative overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="container-custom">
                        <span className="inline-block px-3 py-1 bg-[#d4af37] text-[#1a3a3a] text-xs font-bold tracking-widest uppercase mb-4 rounded-sm">
                            {post.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-serif text-white max-w-4xl leading-tight mb-4">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center gap-2">
                                <User size={16} />
                                <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-16">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Main Content */}
                    <article className="lg:w-2/3">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1a3a3a] mb-8 transition-colors text-sm font-medium">
                            <ArrowLeft size={16} /> Back to Journal
                        </Link>

                        <div
                            className="prose prose-lg prose-headings:font-serif prose-a:text-[#d4af37] text-gray-700 max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Tags & Share */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-2 flex-wrap">
                                <Tag size={18} className="text-gray-400" />
                                {post.tags.map(tag => (
                                    <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs hover:bg-[#1a3a3a] hover:text-white transition-colors cursor-pointer">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 font-medium">Share:</span>
                                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#1a3a3a] hover:text-[#1a3a3a] transition-all"><Facebook size={14} /></button>
                                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#1a3a3a] hover:text-[#1a3a3a] transition-all"><Twitter size={14} /></button>
                                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#1a3a3a] hover:text-[#1a3a3a] transition-all"><Linkedin size={14} /></button>
                            </div>
                        </div>

                        {/* Comments Placeholder */}
                        <div className="mt-16 bg-[#f8f6f0] p-8 rounded-lg">
                            <h3 className="text-2xl font-serif text-[#1a3a3a] mb-6">Join the Conversation</h3>
                            <p className="text-gray-500 mb-6">Thoughts on slow living? Share them below.</p>
                            <textarea
                                className="w-full p-4 border border-gray-200 rounded-md focus:border-[#d4af37] outline-none min-h-[120px]"
                                placeholder="Write a comment..."
                            ></textarea>
                            <div className="mt-4 text-right">
                                <Button variant="primary">Post Comment</Button>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:w-1/3 space-y-12">
                        {/* About Author */}
                        <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-lg text-center">
                            <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full mb-4 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" alt="Sarah" />
                            </div>
                            <h4 className="font-serif text-xl mb-2">{post.author}</h4>
                            <p className="text-sm text-gray-500 mb-4">Curator & Editor</p>
                            <p className="text-gray-600 text-sm mb-6">Passionate about sustainable design and the stories behind objects.</p>
                            <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                        </div>

                        {/* Related Products */}
                        <div>
                            <h4 className="font-serif text-lg border-b border-gray-200 pb-2 mb-6 uppercase tracking-wider text-sm">Featured in Story</h4>
                            <div className="space-y-6">
                                {[
                                    { name: "Artisan Ceramic Mug", price: "$42.00", img: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200" },
                                    { name: "Woven Wool Throw", price: "$125.00", img: "https://images.unsplash.com/photo-1580301762395-9c64265e9c31?w=200" }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 group cursor-pointer">
                                        <div className="w-20 h-20 bg-gray-100 overflow-hidden rounded-md">
                                            <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                        </div>
                                        <div>
                                            <h5 className="font-serif text-[#1a3a3a] group-hover:text-[#d4af37] transition-colors">{item.name}</h5>
                                            <p className="text-gray-500 text-sm mt-1">{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Mini */}
                        <div className="bg-[#1a3a3a] text-white p-8 text-center rounded-lg">
                            <h4 className="font-serif text-2xl italic mb-2">Artisio Journal</h4>
                            <p className="text-white/70 text-sm mb-6">Weekly stories committed to craft and culture.</p>
                            <input type="email" placeholder="Your email" className="w-full p-3 text-gray-900 rounded-md mb-3 outline-none" />
                            <button className="w-full py-3 bg-[#d4af37] text-[#1a3a3a] font-bold uppercase tracking-wider text-xs hover:bg-white transition-colors rounded-md">
                                Subscribe
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
