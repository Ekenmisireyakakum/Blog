const posts = [
    {
        id: 1,
        title: "How I Started Learning Web Development",
        category: "Web Development",
        author: "Tanova",
        date: "September 20, 2026",
        readingTime: "5 min read",
        image: "images/ZrNXC.jpg",
        excerpt: "A beginner-friendly journey into HTML, CSS and JavaScript — and the mistakes that made me better.",
        featured: true,
        popular: true,
        content: `
            <p>Everyone starts somewhere. For me, it was a rainy afternoon, a laptop, and a YouTube tutorial that kept buffering every five minutes. I had no idea what HTML stood for, and I certainly did not know I was about to fall completely in love with building things on the web.</p>

            <h2>The Beginning</h2>
            <p>My first real experience with code was typing out a "Hello, World!" inside a pair of angle brackets. It felt silly. I refreshed the browser and saw it appear on screen, and something clicked. I could write text in a file and the browser would show it. That was it. That was the hook.</p>

            <p>I spent the next two weeks going through every free resource I could find. I learned about headings, paragraphs, images, and links. I built a page that looked like it was from 2001. It was beautiful to me.</p>

            <h2>Getting to CSS</h2>
            <p>CSS was where things got complicated fast. Centering a div became my personal enemy. I would spend an hour trying to get something to align properly, only to break something else in the process. But every problem I solved taught me something real.</p>

            <blockquote>The best way to learn web development is not to read about it. It is to break things and figure out why they broke.</blockquote>

            <p>Once I understood the box model and how elements actually lay themselves out, everything else started to make sense. Flexbox felt like a superpower after fighting floats.</p>

            <h2>JavaScript Changed Everything</h2>
            <p>When I finally touched JavaScript, I understood what "making things actually work" meant. A button that did something. A page that responded to what I typed. A counter that went up when I clicked. These felt like magic.</p>

            <pre><code>document.querySelector('button').addEventListener('click', function() {
    alert('You clicked me!');
});</code></pre>

            <p>That tiny snippet of code gave me a feeling no other technology had. I was not just describing a page anymore. I was programming behavior.</p>

            <h2>The Mistakes That Taught Me the Most</h2>
            <ul>
                <li>Copying code without understanding it — this only delays learning</li>
                <li>Skipping the fundamentals to jump to frameworks too early</li>
                <li>Not building real projects and only following tutorials</li>
                <li>Being afraid to break things</li>
            </ul>

            <h2>Where I Am Now</h2>
            <p>I still learn every day. The web is enormous and it keeps growing. But the foundation I built with plain HTML, CSS, and JavaScript has never failed me. Whatever tool or framework I pick up, I understand what it is actually doing underneath.</p>

            <p>If you are just starting out, build something. Anything. A personal page, a to-do list, a simple game. The act of building is what teaches you — not watching someone else do it.</p>
        `
    },
    {
        id: 2,
        title: "Understanding JavaScript Closures Once and For All",
        category: "JavaScript",
        author: "Tanova",
        date: "September 25, 2026",
        readingTime: "6 min read",
        image: "images/Medium.jpg",
        excerpt: "Closures are one of the most misunderstood parts of JavaScript. Here is a clear and practical explanation.",
        featured: false,
        popular: true,
        content: `
            <p>If you have spent any time with JavaScript, you have probably heard the word "closure" mentioned with a mix of reverence and confusion. It sounds like an advanced concept, but once you actually see what it is doing, it becomes one of the most useful tools in the language.</p>

            <h2>What Is a Closure?</h2>
            <p>A closure is simply a function that remembers the variables from the place where it was created, even after that outer function has finished running. The inner function carries a reference to its outer scope with it wherever it goes.</p>

            <pre><code>function createCounter() {
    let count = 0;

    return function() {
        count = count + 1;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3</code></pre>

            <p>The <code>count</code> variable is defined inside <code>createCounter</code>. When <code>createCounter</code> runs and returns, you might expect <code>count</code> to disappear. But the returned function still holds a reference to it, keeping it alive in memory.</p>

            <h2>Why Does This Matter?</h2>
            <p>Closures let you create private state. The <code>count</code> variable above cannot be accessed from outside. Only the returned function can read and change it. This is a clean way to hide data and expose only what you want.</p>

            <h2>A Practical Example</h2>
            <p>Consider a simple theme manager:</p>

            <pre><code>function createThemeManager(initialTheme) {
    let current = initialTheme;

    return {
        get: function() { return current; },
        set: function(newTheme) { current = newTheme; }
    };
}

const theme = createThemeManager('light');
console.log(theme.get()); // light
theme.set('dark');
console.log(theme.get()); // dark</code></pre>

            <p>The <code>current</code> variable is enclosed — private to the object that was returned. This is a common pattern used throughout real JavaScript applications.</p>

            <h2>The Loop Trap</h2>
            <p>One classic closure mistake happens inside loops:</p>

            <pre><code>for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
// Prints: 3, 3, 3 (not 0, 1, 2)</code></pre>

            <p>Because <code>var</code> is function-scoped, all three functions share the same <code>i</code>. By the time they run, the loop has finished and <code>i</code> is 3. The fix is to use <code>let</code>, which creates a new binding for each iteration.</p>

            <h2>Summary</h2>
            <p>A closure is a function plus the environment it was created in. It is not magic. It is just JavaScript's way of letting functions carry their own memory. Once that clicks, a lot of JavaScript patterns suddenly make sense.</p>
        `
    },
    {
        id: 3,
        title: "Why Reading Books Changed the Way I Think",
        category: "Personal Growth",
        author: "Tanova",
        date: "September 28, 2026",
        readingTime: "4 min read",
        image: "images/download (6).jpg",
        excerpt: "I used to scroll for hours and feel empty. Then I started reading. Here is what changed.",
        featured: false,
        popular: false,
        content: `
            <p>For a long time I told myself I was too busy to read. I had work, responsibilities, and somehow always found time to scroll through my phone for an hour before bed. The irony of that did not hit me until I actually tracked where my time was going.</p>

            <h2>The Shift</h2>
            <p>I started with one book. Nothing ambitious — a short book about habits I had been recommended a dozen times. I read it over two weeks, about twenty minutes before bed. When I finished, I noticed something odd: I felt like I had actually done something. That feeling was worth chasing.</p>

            <blockquote>You are the average of the ideas you consume. Feed your mind deliberately.</blockquote>

            <h2>What Reading Actually Does</h2>
            <p>Reading forces a kind of active engagement that passive media does not. When you watch something, you receive it. When you read, you reconstruct it in your own mind. You fill in the details, you make the connections, and you build your own version of what the author is describing.</p>

            <p>Over time, that process of reconstruction rewires how you think. You get better at following long arguments. You get better at holding complexity in your head. Your attention span actually grows.</p>

            <h2>Practical Changes I Made</h2>
            <ul>
                <li>Phone off 30 minutes before bed, replaced by a physical book</li>
                <li>One chapter minimum per day — small enough to never feel like a burden</li>
                <li>A small notebook nearby to write down anything that strikes me</li>
                <li>No pressure to finish every book — if it stops being useful, I stop</li>
            </ul>

            <h2>The Compound Effect</h2>
            <p>Reading one book changes almost nothing. Reading fifty books over a few years changes a great deal. The knowledge compounds. Ideas from one book appear as echoes in another. Patterns emerge across subjects. Your model of the world becomes richer and more nuanced.</p>

            <p>I am not suggesting everyone should become a bookworm. But if you feel like your thinking is shallow or you are perpetually distracted, replacing even one hour of scrolling with reading per week is worth trying. The results are quiet and slow, and they are real.</p>
        `
    },
    {
        id: 4,
        title: "CSS Grid vs Flexbox: When to Use Which",
        category: "Web Development",
        author: "Tanova",
        date: "October 1, 2026",
        readingTime: "7 min read",
        image: "images/Grid.jpg",
        excerpt: "Both are powerful layout tools. Understanding their differences will save you hours of frustration.",
        featured: false,
        popular: true,
        content: `
            <p>If you have been building web pages for any amount of time, you have almost certainly encountered both CSS Flexbox and CSS Grid. Both are modern, powerful layout tools. Both are supported by every modern browser. And both can sometimes seem interchangeable. So which one do you use?</p>

            <h2>The Core Difference</h2>
            <p>Flexbox is designed for one-dimensional layout — either a row or a column. Grid is designed for two-dimensional layout — rows and columns at the same time.</p>

            <p>That one distinction answers most questions about when to use which one.</p>

            <h2>When to Use Flexbox</h2>
            <p>Use Flexbox when you are laying out items along a single axis. The most common use cases are:</p>

            <ul>
                <li>Navigation bars — items in a row, with spacing between them</li>
                <li>Centering a single element vertically and horizontally</li>
                <li>Distributing buttons or icons across a container</li>
                <li>Aligning form elements in a row</li>
            </ul>

            <pre><code>.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}</code></pre>

            <h2>When to Use Grid</h2>
            <p>Use Grid when you need to control both rows and columns simultaneously. Common use cases:</p>

            <ul>
                <li>Page layouts with header, sidebar, content, and footer</li>
                <li>Card grids that wrap responsively</li>
                <li>Magazine-style layouts where items span multiple columns</li>
                <li>Any layout where items need to align both horizontally and vertically with each other</li>
            </ul>

            <pre><code>.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}</code></pre>

            <h2>Can You Use Both?</h2>
            <p>Yes — and you often should. A page might use Grid for the overall layout and Flexbox inside each card component. They are complementary tools, not competing ones.</p>

            <h2>A Simple Rule of Thumb</h2>
            <p>Ask yourself: am I thinking about one direction, or two? One direction is Flexbox territory. Two directions, where rows and columns interact, is Grid territory. Most of the time, that one question is enough to point you in the right direction.</p>
        `
    },
    {
        id: 5,
        title: "The Beginner's Guide to Responsive Web Design",
        category: "Technology",
        author: "Tanova",
        date: "October 2, 2026",
        readingTime: "8 min read",
        image: "images/Web.jpg",
        excerpt: "Making websites work on every screen size is not optional anymore. Here is how to think about it.",
        featured: false,
        popular: false,
        content: `
            <p>In 2010, Ethan Marcotte introduced the term "responsive web design" and changed how the web is built. Today, over 60% of web traffic comes from mobile devices. Designing only for desktop is designing for a minority of your visitors.</p>

            <h2>What Responsive Design Actually Means</h2>
            <p>Responsive design is not about making your desktop site smaller. It is about designing an experience that works well at any viewport size. Sometimes that means the same layout with different proportions. Sometimes it means a completely different arrangement of elements.</p>

            <h2>The Viewport Meta Tag</h2>
            <p>This single line of HTML is the starting point for any responsive design:</p>

            <pre><code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code></pre>

            <p>Without it, mobile browsers will zoom out and render the desktop version of your site. With it, the browser uses the device's actual width as the viewport width.</p>

            <h2>Mobile-First CSS</h2>
            <p>The mobile-first approach means you write your base CSS for small screens and then use media queries to add styles for larger screens. This tends to result in cleaner, more focused CSS because you start with the constraints.</p>

            <pre><code>.container {
    padding: 1rem;
}

@media (min-width: 768px) {
    .container {
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
}</code></pre>

            <h2>Flexible Images</h2>
            <p>Images need a single CSS rule to become responsive:</p>

            <pre><code>img {
    max-width: 100%;
    height: auto;
}</code></pre>

            <p>This ensures images never overflow their container while maintaining their aspect ratio.</p>

            <h2>Responsive Typography</h2>
            <p>Instead of setting fixed font sizes in pixels, use relative units. The <code>clamp()</code> function is particularly powerful for fluid typography:</p>

            <pre><code>h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
}</code></pre>

            <p>This sets a minimum, a preferred fluid size, and a maximum — all in one line.</p>

            <h2>Testing Your Responsive Design</h2>
            <p>Browser DevTools has a device simulation mode (usually triggered with Ctrl+Shift+M or Cmd+Shift+M) that lets you test different screen sizes without a physical device. It is not perfect, but it is a fast and practical way to catch obvious layout problems.</p>
        `
    },
    {
        id: 6,
        title: "Building Good Habits as a Self-Taught Developer",
        category: "Education",
        author: "Tanova",
        date: "October 3, 2026",
        readingTime: "5 min read",
        image: "images/goal.jpg",
        excerpt: "Self-teaching is powerful but messy. These habits helped me go from confused to consistent.",
        featured: false,
        popular: false,
        content: `
            <p>Teaching yourself to code is one of the most rewarding things you can do. It is also one of the most disorienting. There is no syllabus, no one telling you what to learn next, and no clear signal that you are making progress. These habits helped me build structure in that chaos.</p>

            <h2>Code Every Day — Even for Ten Minutes</h2>
            <p>Consistency beats intensity. Ten minutes of code every day is better than a five-hour session on Saturday. Daily practice keeps the language fresh in your mind and builds momentum that is very hard to stop once started.</p>

            <p>The goal is not to make huge progress every day. The goal is to never go more than 24 hours without touching code.</p>

            <h2>Build, Do Not Just Study</h2>
            <p>Tutorials are comfortable. You follow along, things work, and you feel productive. But nothing sticks until you have tried to build something from scratch, struggled with it, and solved the problems yourself.</p>

            <p>After every tutorial, close it and rebuild what you just learned without looking. This one step will reveal everything you actually did not understand.</p>

            <h2>Keep a Learning Journal</h2>
            <p>Write down what you learned each day. It does not need to be formal — a few sentences in a text file is enough. Over time, this journal becomes a personal reference and a record of how far you have come. On the days when you feel like you are not improving, your journal is proof that you are.</p>

            <h2>Read Other People's Code</h2>
            <p>Reading code is a skill as important as writing it. Browse GitHub, look at open-source projects, study how experienced developers structure their work. You will pick up patterns, naming conventions, and approaches you would never have discovered on your own.</p>

            <h2>Embrace Being Stuck</h2>
            <p>Being stuck is not a sign that you are failing. It is where learning happens. The moment before understanding is always confusion. When you feel stuck, you are usually one step away from a breakthrough. Give it time before reaching for the answer.</p>
        `
    },
    {
        id: 7,
        title: "How to Think Like a Problem Solver",
        category: "Personal Growth",
        author: "Tanova",
        date: "October 4, 2026",
        readingTime: "6 min read",
        image: "images/problem.jpg",
        excerpt: "Problem-solving is a skill, not a talent. Here is how to get better at it intentionally.",
        featured: false,
        popular: false,
        content: `
            <p>Some people seem to naturally break down complex problems and find elegant solutions. It looks like a gift. In reality, it is a practiced skill — one that anyone can develop with the right approach.</p>

            <h2>Understand Before You Solve</h2>
            <p>The most common mistake in problem-solving is rushing to a solution before fully understanding the problem. Take time to articulate the problem clearly. Try explaining it in plain language. If you cannot explain it simply, you do not understand it well enough to solve it.</p>

            <blockquote>If you can't explain it simply, you don't understand it well enough. — often attributed to Einstein</blockquote>

            <h2>Break It Down</h2>
            <p>Large problems feel overwhelming because they are. The solution is to decompose them into the smallest possible sub-problems, then solve those. A problem that took you two days as one big task might take two hours broken into ten small tasks.</p>

            <h2>Work Backwards From the Solution</h2>
            <p>Sometimes you know what the outcome needs to look like, but not how to get there. Start from the desired result and ask what needs to be true for that result to exist. Then ask what needs to be true for those things to be true. Keep going until you reach something you already know how to do.</p>

            <h2>Make It Work, Then Make It Better</h2>
            <p>In coding especially, the first solution does not need to be elegant. Get something working — anything working — and then improve it. The act of building a bad solution teaches you what a good one looks like. Waiting for a perfect solution before writing any code is a form of paralysis.</p>

            <h2>Learn From Each Problem</h2>
            <p>After solving a problem, ask yourself: what was the core insight that unlocked it? Write it down. The pattern that cracked this problem will appear again in a different form, and recognizing it quickly is what separates experienced problem-solvers from beginners.</p>
        `
    },
    {
        id: 8,
        title: "Simple Productivity Habits That Actually Work",
        category: "Lifestyle",
        author: "Tanova",
        date: "October 5, 2026",
        readingTime: "4 min read",
        image: "images/growth.jpg",
        excerpt: "Most productivity advice is complicated. These simple habits have a quiet but real impact.",
        featured: false,
        popular: false,
        content: `
            <p>Productivity advice is everywhere, and most of it is either obvious, unsustainable, or designed to sell you something. These habits are none of those things. They are small, quiet, and they actually compound over time.</p>

            <h2>Write Down Three Things Every Morning</h2>
            <p>Before you open your email, your phone, or your laptop, write down three things you want to accomplish today. Not ten. Not a full task list. Three. This act forces you to prioritize before the noise of the day takes over and fills your time for you.</p>

            <h2>Single-Tasking Is Not a Myth</h2>
            <p>Multitasking feels productive and is not. Every time you switch between tasks, you pay a cognitive switching cost. You lose context, you lose focus, and you lose quality. Working on one thing at a time — fully, without switching — produces better work in less time.</p>

            <h2>Protect the First Hour</h2>
            <p>The first hour after waking is when your mind is freshest. Most people spend it reading notifications and reacting to other people's priorities. Use it for your most important work instead. This one change has more impact than almost anything else.</p>

            <h2>The Two-Minute Rule</h2>
            <p>If something takes less than two minutes, do it now rather than adding it to a list. The cognitive cost of managing small tasks on a list is often greater than just doing them. Clear the small things quickly and keep your attention for the work that actually matters.</p>

            <h2>End the Day With a Review</h2>
            <p>Take five minutes at the end of each day to write down what you did and what you did not do. This keeps you honest, helps you notice patterns, and gives the day a proper close so it does not bleed into your personal time. The work is done. You can stop thinking about it.</p>
        `
    }
];

function loadUserPosts() {
    try {
        var stored = localStorage.getItem('tanovaUserPosts');
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        return [];
    }
}

function saveUserPosts(userPosts) {
    try {
        localStorage.setItem('tanovaUserPosts', JSON.stringify(userPosts));
    } catch (e) {}
}

function getAllPosts() {
    return posts.concat(loadUserPosts());
}

function getPostById(id) {
    return getAllPosts().find(function(post) { return post.id === id; }) || null;
}

function getPostsByCategory(category) {
    return getAllPosts().filter(function(post) {
        return post.category.toLowerCase() === category.toLowerCase();
    });
}

function getFeaturedPost() {
    var all = getAllPosts();
    return all.find(function(post) { return post.featured === true; }) || all[0];
}

function getPopularPosts() {
    return getAllPosts().filter(function(post) { return post.popular === true; });
}

function searchPosts(query) {
    var q = query.toLowerCase().trim();
    var all = getAllPosts();
    if (!q) return all;
    return all.filter(function(post) {
        return (
            post.title.toLowerCase().includes(q) ||
            post.excerpt.toLowerCase().includes(q) ||
            post.category.toLowerCase().includes(q) ||
            post.author.toLowerCase().includes(q)
        );
    });
}

function generatePostId() {
    var all = getAllPosts();
    var maxId = all.reduce(function(max, p) { return p.id > max ? p.id : max; }, 0);
    return maxId + 1;
}

function deleteUserPost(id) {
    var userPosts = loadUserPosts();
    userPosts = userPosts.filter(function(p) { return p.id !== id; });
    saveUserPosts(userPosts);
}

function estimateReadingTime(text) {
    var words = text.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    var minutes = Math.max(1, Math.round(words / 200));
    return minutes + ' min read';
}
