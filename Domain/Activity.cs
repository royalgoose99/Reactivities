namespace Domain
{
    // Entities or Models
    // Activity referes to the name of the table
    // Properties will serve as column names of the table
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

    }
}
