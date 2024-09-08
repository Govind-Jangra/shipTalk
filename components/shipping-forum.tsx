'use client'

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowUpIcon, ArrowDownIcon, MessageSquareIcon, PackageIcon, TruckIcon, SearchIcon, HomeIcon, TrendingUpIcon, PlusCircleIcon, DollarSignIcon, ClockIcon, BotIcon, SendIcon } from "lucide-react"

const Comment = ({ comment }) => (
  <div className="border-t border-gray-700 pt-2 mt-2">
    <p className="text-sm text-gray-400">{comment.content}</p>
    <p className="text-xs text-gray-500 mt-1">Posted by {comment.author} on {comment.date}</p>
  </div>
)

const ForumPost = ({ post: initialPost }) => {
  const [post, setPost] = useState(initialPost)
  const [newComment, setNewComment] = useState("")
  const [showAllComments, setShowAllComments] = useState(false)

  const handleVote = (type) => {
    setPost(prevPost => ({
      ...prevPost,
      upvotes: type === 'up' ? prevPost.upvotes + 1 : prevPost.upvotes - 1
    }))
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        content: newComment,
        author: "Anonymous User",
        date: new Date().toLocaleDateString()
      }
      setPost(prevPost => ({
        ...prevPost,
        comments: [...prevPost.comments, comment]
      }))
      setNewComment("")
    }
  }

  const displayedComments = showAllComments ? post.comments : post.comments.slice(0, 2)

  return (
    <div className="flex space-x-4 border border-gray-700 rounded-lg p-4 bg-gray-800">
      <div className="flex flex-col items-center space-y-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleVote('up')}
          className="hover:bg-green-900 hover:text-green-400"
        >
          <ArrowUpIcon className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">{post.upvotes}</span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => handleVote('down')}
          className="hover:bg-red-900 hover:text-red-400"
        >
          <ArrowDownIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-semibold text-gray-100">{post.title}</h3>
        <p className="text-sm text-gray-400">{post.content}</p>
        <div className="flex items-center space-x-2">
          <MessageSquareIcon className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500">{post.comments.length} comments</span>
        </div>
        <div className="space-y-2">
          {displayedComments.map(comment => (
            <Comment key={comment.id} comment={comment} />
          ))}
          {post.comments.length > 2 && (
            <Button 
              variant="link" 
              onClick={() => setShowAllComments(!showAllComments)}
              className="text-yellow-500 hover:text-yellow-400 p-0"
            >
              {showAllComments ? "Show less" : `Show all ${post.comments.length} comments`}
            </Button>
          )}
        </div>
        <form onSubmit={handleAddComment} className="mt-2">
          <Input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
          />
          <Button type="submit" className="mt-2 bg-yellow-500 text-gray-900 hover:bg-yellow-400">
            Add Comment
          </Button>
        </form>
      </div>
    </div>
  )
}

const HomePage = () => (
  <>
    <h1 className="text-3xl font-bold mb-6 text-gray-100">Recent Discussions</h1>
    <div className="space-y-4">
      {[
        {
          title: "UPS vs FedEx for international B2B shipments",
          content: "I'm looking to expand my business internationally and I'm torn between UPS and FedEx for B2B shipments. Any experiences or recommendations?",
          upvotes: 24,
          comments: [
            { id: 1, content: "I've had great experiences with UPS for international shipments. Their tracking is top-notch.", author: "ShippingPro", date: "2023-06-15" },
            { id: 2, content: "FedEx has better rates for heavier packages in my experience.", author: "LogisticsGuru", date: "2023-06-16" },
            { id: 3, content: "It really depends on the specific countries you're shipping to. I'd recommend getting quotes for your most common routes.", author: "GlobalTrader", date: "2023-06-17" }
          ],
        },
        {
          title: "Best practices for reducing shipping damages",
          content: "We've been experiencing an increase in shipping damages lately. What are some best practices you've implemented to reduce damages during transit?",
          upvotes: 18,
          comments: [
            { id: 1, content: "Double boxing has significantly reduced our damage rates for fragile items.", author: "CarefulShipper", date: "2023-06-14" },
            { id: 2, content: "We started using custom foam inserts and haven't looked back. It's a bit more expensive but worth it.", author: "QualityFirst", date: "2023-06-15" }
          ],
        },
        {
          title: "New USPS rates impact on small businesses",
          content: "The new USPS rates are out. How are other small businesses adapting to these changes? Are you considering switching carriers?",
          upvotes: 31,
          comments: [
            { id: 1, content: "We're looking into regional carriers for some of our shipments now. The USPS increases are hitting us hard.", author: "SmallBizOwner", date: "2023-06-13" },
            { id: 2, content: "We've started offering local pickup options to offset some of the shipping costs.", author: "AdaptiveEntrepreneur", date: "2023-06-14" },
            { id: 3, content: "Considering a switch to UPS SurePost for lighter packages. Anyone have experience with this?", author: "ShippingNewbie", date: "2023-06-15" }
          ],
        },
      ].map((post, index) => (
        <ForumPost key={index} post={post} />
      ))}
    </div>
  </>
)

const PopularPage = () => (
  <>
    <h1 className="text-3xl font-bold mb-6 text-gray-100">Popular Discussions</h1>
    <div className="space-y-4">
      {[
        {
          title: "Comparing API integrations: UPS vs FedEx vs USPS",
          content: "Let's discuss the pros and cons of each carrier's API for shipment tracking and label generation. Which one provides the best developer experience?",
          upvotes: 89,
          comments: [
            { id: 1, content: "UPS's API documentation is the most comprehensive in my experience.", author: "DevGuru", date: "2023-06-10" },
            { id: 2, content: "FedEx's API has been the most reliable for us, especially for international shipments.", author: "GlobalShipper", date: "2023-06-11" },
            { id: 3, content: "USPS's API is straightforward, but their error handling could use some improvement.", author: "APIEnthusiast", date: "2023-06-12" }
          ],
        },
        {
          title: "Strategies for optimizing LTL shipping costs",
          content: "Share your tips and tricks for reducing Less Than Truckload (LTL) shipping costs without compromising on delivery times or service quality.",
          upvotes: 76,
          comments: [
            { id: 1, content: "We've had success with freight consolidation services. It takes a bit more planning but the cost savings are significant.", author: "LTLExpert", date: "2023-06-09" },
            { id: 2, content: "Negotiating volume discounts with carriers has been a game-changer for us.", author: "BulkShipper", date: "2023-06-10" }
          ],
        },
      ].map((post, index) => (
        <ForumPost key={index} post={post} />
      ))}
    </div>
  </>
)

const NewPostPage = () => (
  <>
    <h1 className="text-3xl font-bold mb-6 text-gray-100">Create a New Post</h1>
    <form className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
        <Input 
          id="title" 
          placeholder="Enter your post title" 
          className="mt-1 bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400" 
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-300">Content</label>
        <Textarea
          id="content"
          rows={6}
          placeholder="Enter your post content"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
        />
      </div>
      <Button type="submit" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">Submit Post</Button>
    </form>
  </>
)

const UPSvsFedExPage = () => (
  <>
    <h1 className="text-3xl font-bold mb-6 text-gray-100">UPS vs FedEx Discussions</h1>
    <div className="space-y-4">
      {[
        {
          title: "UPS vs FedEx: International shipping rates comparison 2023",
          content: "I've compiled a detailed comparison of UPS and FedEx international shipping rates for 2023. Let's discuss the findings and their implications for B2B shippers.",
          upvotes: 56,
          comments: [
            { id: 1, content: "Great comparison! In my experience, UPS tends to be more cost-effective for heavier packages.", author: "IntlShipper", date: "2023-06-08" },
            { id: 2, content: "FedEx seems to have better rates for express shipments to Europe. Anyone else noticed this?", author: "EuroTrader", date: "2023-06-09" }
          ],
        },
        {
          title: "Customer service experiences: UPS vs FedEx",
          content: "Share your experiences with UPS and FedEx customer service. Which carrier do you find more responsive and helpful in resolving issues?",
          upvotes: 43,
          comments: [
            { id: 1, content: "UPS customer service has been more consistent in my experience. They seem to have better training.", author: "ServiceMinded", date: "2023-06-07" },
            { id: 2, content: "I've had better luck with FedEx for resolving complex customs issues.", author: "CustomsPro", date: "2023-06-08" }
          ],
        },
      ].map((post, index) => (
        <ForumPost key={index} post={post} />
      ))}
    </div>
  </>
)

const PackagingSolutionsPage = () => (
  <>
    <h1 className="text-3xl font-bold mb-6 text-gray-100">Packaging Solutions Discussions</h1>
    <div className="space-y-4">
      {[
        {
          title: "Innovative packaging materials for fragile items",
          content: "What are some innovative packaging materials you've used or come across for shipping fragile items? Share your experiences and recommendations.",
          upvotes: 67,
          comments: [
            { id: 1, content: "We've been using biodegradable packing peanuts made from cornstarch. They work great and are eco-friendly!", author: "GreenPacker", date: "2023-06-06" },
            { id: 2, content: "Inflatable air pillows have been a game-changer for us. They're lightweight and provide excellent protection.", author: "SafeShipper", date: "2023-06-07" }
          ],
        },
        {
          title: "Cost-effective eco-friendly packaging options",
          content: "Let's discuss cost-effective eco-friendly packaging options for B2B shipments. What solutions have you found that balance sustainability and affordability?",
          upvotes: 52,
          comments: [
            { id: 1, content: "We switched to recycled cardboard boxes and saw only a marginal increase in costs. Our customers love it.", author: "EcoShipper", date: "2023-06-05" },
            { id: 2, content: "Paper tape instead of plastic tape has been an easy switch for us. It's surprisingly strong!", author: "GreenPacker", date: "2023-06-06" }
          ],
        },
      ].map((post, index) => (
        <ForumPost key={index} post={post} />
      ))}
    </div>
  </>
)

const TrackingIssuesPage = () => (
  <>
    <h1 className="text-3xl font-bold mb-6 text-gray-100">Tracking Issues Discussions</h1>
    <div className="space-y-4">
      {[
        {
          title: "Dealing with 'in transit' status for extended periods",
          content: "How do you handle situations where packages remain 'in transit' for unusually long periods? What strategies do you use to investigate and resolve these issues?",
          upvotes: 72,
          comments: [
            { id: 1, content: "We've set up automated alerts for packages that haven't updated in 48 hours. This helps us proactively reach out to carriers.", author: "ProactiveShipper", date: "2023-06-04" },
            { id: 2, content: "Building relationships with local carrier reps has been crucial for quickly resolving these issues.", author: "NetworkBuilder", date: "2023-06-05" }
          ],
        },
        {
          title: "Best practices for communicating tracking updates to customers",
          content: "What are your best practices for keeping customers informed about their shipment status? How do you handle delays or issues in a way that maintains customer satisfaction?",
          upvotes: 61,
          comments: [
            { id: 1, content: "We've implemented a system that sends automated updates at key milestones. Customers appreciate the proactive communication.", author: "CustomerFirst", date: "2023-06-03" },
            { id: 2, content: "For B2B clients, we offer a branded tracking page that includes expected delivery dates and any potential delays.", author: "B2BExpert", date: "2023-06-04" }
          ],
        },
      ].map((post, index) => (
        <ForumPost key={index} post={post} />
      ))}
    </div>
  </>
)

const CostOptimizationPage = () => (
  <>
    <h1 className="text-3xl font-bold mb-6 text-gray-100">Cost Optimization Discussions</h1>
    <div className="space-y-4">
      {[
        {
          title: "Strategies for reducing shipping costs without compromising quality",
          content: "What are some effective strategies you've implemented to reduce shipping costs while maintaining service quality? Let's share our experiences and ideas.",
          upvotes: 85,
          comments: [
            { id: 1, content: "We've had great success with zone skipping for our high-volume lanes. It requires more planning but the cost savings are significant.", author: "LogisticsWizard", date: "2023-06-02" },
            { id: 2, content: "Implementing a multi-carrier strategy has allowed us to always choose the most cost-effective option for each shipment.", author: "FlexibleShipper", date: "2023-06-03" }
          ],
        },
        {
          title: "Negotiating better rates with carriers: Tips and tricks",
          content: "For those who have successfully negotiated better rates with carriers, what strategies worked best for you? Any advice for smaller businesses looking to improve their shipping rates?",
          upvotes: 73,
          comments: [
            { id: 1, content: "Consolidating our shipping volume with fewer carriers gave us more leverage in negotiations. We saw a 15% reduction in rates.", author: "VolumeShipper", date: "2023-06-01" },
            { id: 2, content: "Don't underestimate the power of data. We presented our shipping patterns and volumes to carriers, which helped us secure better rates for our most common routes.", author: "DataDrivenLogistics", date: "2023-06-02" }
          ],
        },
      ].map((post, index) => (
        <ForumPost key={index} post={post} />
      ))}
    </div>
  </>
)

const DeliveryTimesPage = () => (
  <>
    <h1 className="text-3xl font-bold mb-6 text-gray-100">Delivery Times Discussions</h1>
    <div className="space-y-4">
      {[
        {
          title: "Improving last-mile delivery efficiency",
          content: "Last-mile delivery continues to be a challenge. What innovative solutions or best practices have you implemented to improve efficiency in this crucial stage?",
          upvotes: 91,
          comments: [
            { id: 1, content: "We've partnered with local businesses to set up pickup points. It's reduced our last-mile costs and customers appreciate the flexibility.", author: "LocalLogistics", date: "2023-05-31" },
            { id: 2, content: "Implementing route optimization software has significantly improved our delivery efficiency. We're completing 20% more deliveries per day.", author: "TechSavvyShipper", date: "2023-06-01" }
          ],
        },
        {
          title: "Strategies for meeting same-day delivery expectations",
          content: "With the growing demand for same-day delivery, how are you adapting your operations to meet these expectations? What challenges are you facing?",
          upvotes: 88,
          comments: [
            { id: 1, content: "We've set up micro-fulfillment centers in our key markets. It's been a game-changer for same-day delivery.", author: "UrbanLogistics", date: "2023-05-30" },
            { id: 2, content: "We're using predictive analytics to anticipate demand and pre-position inventory. It's helping us meet same-day delivery for our most popular items.", author: "DataDrivenDelivery", date: "2023-05-31" }
          ],
        },
      ].map((post, index) => (
        <ForumPost key={index} post={post} />
      ))}
    </div>
  </>
)

const AIAssistant = () => {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setIsLoading(true)
      // Simulate AI response
      setTimeout(() => {
        setSelectedPost(aiResponse)
        setIsLoading(false)
      }, 2000)
      setQuery("")
    }
  }

  const aiResponse = {
    title: "Shipping Best Practices",
    content: "Based on our forum discussions, here are some key shipping best practices: Use appropriate packaging materials to reduce damages. Compare rates between carriers for different shipment types. Implement a multi-carrier strategy for cost optimization. Set up automated tracking alerts for proactive issue resolution. Consider eco-friendly packaging options to appeal to environmentally conscious customers. Optimize last-mile delivery by partnering with local businesses for pickup points. Utilize route optimization software to improve delivery efficiency. For international shipments, thoroughly research country-specific regulations and customs requirements. Regularly review and negotiate carrier contracts to ensure competitive rates. Invest in quality packaging to minimize damages and returns. Implement a robust tracking system to keep customers informed throughout the shipping process. Consider offering multiple shipping options to cater to different customer needs and preferences.",
    references: [
      { title: "Reducing shipping damages", id: "reduce-shipping-damages" },
      { title: "Carrier comparison strategies", id: "carrier-comparison" },
      { title: "Cost optimization techniques", id: "cost-optimization" },
      { title: "Effective tracking and communication", id: "tracking-communication" },
      { title: "Eco-friendly shipping solutions", id: "eco-friendly-shipping" }
    ]
  }

  return (
    <Card className="w-full mx-auto bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-100">
          <BotIcon className="w-6 h-6 text-yellow-500" />
          <span>ShipTalk AI Assistant</span>
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            type="text"
            placeholder="Ask a shipping question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
          />
          <Button type="submit" size="icon" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400" disabled={isLoading}>
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardFooter>
      {selectedPost && (
        <Dialog>
          <DialogTrigger asChild>
            <Card className="mt-4 bg-gray-700 cursor-pointer hover:bg-gray-600 transition-colors">
              <CardHeader>
                <CardTitle className="text-yellow-500">{selectedPost.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{selectedPost.content}</p>
                <div className="mt-4">
                  <p className="text-sm text-gray-400">Related Discussions:</p>
                  <ul className="list-disc list-inside">
                    {selectedPost.references.map((ref, i) => (
                      <li key={i} className="text-yellow-500 hover:underline cursor-pointer">{ref.title}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-gray-100">
            <DialogHeader>
              <DialogTitle className="text-yellow-500">{selectedPost.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p>{selectedPost.content}</p>
              <div className="mt-4">
                <p className="font-semibold">Related Discussions:</p>
                <ul className="list-disc list-inside">
                  {selectedPost.references.map((ref, i) => (
                    <li key={i} className="text-yellow-500 hover:underline cursor-pointer">{ref.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  )
}

export function ShippingForum() {
  const [activePage, setActivePage] = useState("home")

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <header className="sticky top-0 z-40 w-full border-b border-gray-700 bg-gray-800">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="#" className="flex items-center space-x-2" prefetch={false}>
              <PackageIcon className="h-6 w-6 text-yellow-500" />
              <span className="inline-block font-bold text-yellow-500">ShipTalk</span>
            </Link>
            <nav className="flex gap-6">
              <Button variant="ghost" onClick={() => setActivePage("home")} className="text-gray-300 hover:text-yellow-500 hover:bg-gray-700">
                <HomeIcon className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button variant="ghost" onClick={() => setActivePage("popular")} className="text-gray-300 hover:text-yellow-500 hover:bg-gray-700">
                <TrendingUpIcon className="mr-2 h-4 w-4" />
                Popular
              </Button>
              <Button variant="ghost" onClick={() => setActivePage("new")} className="text-gray-300 hover:text-yellow-500 hover:bg-gray-700">
                <PlusCircleIcon className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Input
                placeholder="Search discussions..."
                className="w-full md:w-[300px] lg:w-[300px] bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400"
              />
            </div>
            <nav className="flex items-center space-x-2">
              <Button size="sm" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>
      <div className="container mt-4 mb-8">
        <AIAssistant />
      </div>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
          <div className="h-full py-6 pr-6 lg:py-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-100">Popular Topics</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700" onClick={() => setActivePage("upsvsfedex")}>
                <TruckIcon className="mr-2 h-4 w-4" />
                UPS vs FedEx
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700" onClick={() => setActivePage("packaging")}>
                <PackageIcon className="mr-2 h-4 w-4" />
                Packaging Solutions
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700" onClick={() => setActivePage("tracking")}>
                <SearchIcon className="mr-2 h-4 w-4" />
                Tracking Issues
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700" onClick={() => setActivePage("costoptimization")}>
                <DollarSignIcon className="mr-2 h-4 w-4" />
                Cost Optimization
              </Button>
              <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-yellow-500 hover:bg-gray-700" onClick={() => setActivePage("deliverytimes")}>
                <ClockIcon className="mr-2 h-4 w-4" />
                Delivery Times
              </Button>
            </div>
          </div>
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          {activePage === "home" && <HomePage />}
          {activePage === "popular" && <PopularPage />}
          {activePage === "new" && <NewPostPage />}
          {activePage === "upsvsfedex" && <UPSvsFedExPage />}
          {activePage === "packaging" && <PackagingSolutionsPage />}
          {activePage === "tracking" && <TrackingIssuesPage />}
          {activePage === "costoptimization" && <CostOptimizationPage />}
          {activePage === "deliverytimes" && <DeliveryTimesPage />}
        </main>
      </div>
    </div>
  )
}