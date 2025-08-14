interface Tech {
    name: string;
    img: string;
    }

    interface LogoDasStacksProps {
    title?: string;
    technologies: Tech[];
    }

    function LogoDasStacks({ title, technologies }: LogoDasStacksProps) {
    return (
        <section className="w-full py-5 bg-gray-300">
        {title && (
            <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
            {title}
            </h2>
        )}
        <div className="flex flex-wrap justify-center gap-8">
            {technologies.map((tech, index) => (
            <div
                key={index}
                className="flex flex-col items-center transition-transform transform hover:scale-105"
            >
                <img
                src={tech.img}
                alt={tech.name}
                className="w-20 h-20 object-contain"
                />
                <span className="mt-2 text-gray-700 font-medium">{tech.name}</span>
            </div>
            ))}
        </div>
        </section>
    );
}

export default LogoDasStacks;
