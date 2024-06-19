export function isDelegationValid(chain: any) {
  // Verify that the no delegation is expired. If any are in the chain, returns false.
  if (!chain || !chain?.delegations) {
    return false;
  }

  for (const { delegation } of chain.delegations) {
    // prettier-ignore
    if (parseInt(delegation.expiration, 16) / 1e6 <= +Date.now()) {
      return false;
    }
  }

  return true;
}
