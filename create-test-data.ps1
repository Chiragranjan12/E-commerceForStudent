# Register test users and create listings
$api = "http://localhost:8080/api"

# Register User 1
$user1 = @{
    name = "Alice Brown"
    email = "alice@example.com"
    password = "Pass123"
} | ConvertTo-Json

try {
    $resp1 = Invoke-WebRequest -Uri "$api/auth/register" -Method POST -ContentType "application/json" -Body $user1 -UseBasicParsing
    $data1 = $resp1.Content | ConvertFrom-Json
    $token1 = $data1.token
    Write-Host "✓ User 1 registered: alice@example.com"
    Write-Host "Token: $($token1.Substring(0,30))..."
} catch {
    Write-Host "Error registering user 1: $_"
    exit 1
}

# Create listings for User 1
$listings = @(
    @{
        title = "Minimalist Wooden Chair"
        description = "Beautiful brutalist wooden chair, single seat"
        price = 5000
        category = "Furniture"
        imageUrl = ""
    },
    @{
        title = "Industrial Pendant Light"
        description = "Raw metal pendant lamp with exposed Edison bulb"
        price = 2500
        category = "Lighting"
        imageUrl = ""
    },
    @{
        title = "Concrete Planter"
        description = "Large concrete planter with minimalist design"
        price = 1800
        category = "Decor"
        imageUrl = ""
    },
    @{
        title = "Steel Wall Shelf"
        description = "Black steel floating shelf, brutalist design"
        price = 3200
        category = "Furniture"
        imageUrl = ""
    }
)

$headers = @{
    "Authorization" = "Bearer $token1"
    "Content-Type" = "application/json"
}

foreach ($listing in $listings) {
    try {
        $listingJson = $listing | ConvertTo-Json
        $resp = Invoke-WebRequest -Uri "$api/listings" -Method POST -Headers $headers -Body $listingJson -UseBasicParsing
        $listData = $resp.Content | ConvertFrom-Json
        Write-Host "Created listing: $($listData.title)"
    } catch {
        Write-Host "Error: $_"
    }
}


Write-Host ""
Write-Host "Test data created successfully!"
Write-Host "Refresh http://localhost:5000 to see listings"
