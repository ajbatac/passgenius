'use server';


/**
 * Checks a SHA-1 hash against the Pwned Passwords API.
 * @param prefix The first 5 characters of the SHA-1 hash.
 * @param suffix The rest of the SHA-1 hash.
 * @returns The number of times the password has been seen in a breach, 0 if not found, or -1 if an error occurred.
 */
export async function checkPwnedHash(prefix: string, suffix: string): Promise<number> {
  try {
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!response.ok) {
      console.error(`HIBP API request failed with status ${response.status}`);
      return -1; // Indicates an error
    }
    const text = await response.text();
    const lines = text.split('\r\n');

    for (const line of lines) {
      const [hashSuffix, count] = line.split(':');
      if (hashSuffix === suffix) {
        return parseInt(count, 10);
      }
    }
    return 0; // Not found in the list of pwned password hashes for this prefix
  } catch (error) {
    console.error("Failed to check pwned password:", error);
    return -1; // Indicates an error
  }
}
