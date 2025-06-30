enum AvailabilityLabel {
    InStock = "In Stock",
    OutOfStock = "Out Of Stock"
}

async function getAvailabilityLabel(available: boolean): Promise<string> {
    return available ? AvailabilityLabel.InStock : AvailabilityLabel.OutOfStock;
}

export { AvailabilityLabel, getAvailabilityLabel };